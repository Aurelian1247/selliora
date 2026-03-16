import OpenAI from "openai";
import { NextResponse } from "next/server";
import { checkGenerationLimit } from "../../../lib/data/generation-limit";
import { registerGeneration } from "../../../lib/data/register-generation";
import { saveGenerationHistory } from "../../../lib/data/save-generation-history";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type BulkRow = {
  productName: string;
  features: string;
  tone: string;
  language: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rows = Array.isArray(body?.rows) ? (body.rows as BulkRow[]) : [];
    const accessToken = String(body?.accessToken || "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token." },
        { status: 401 }
      );
    }

    if (!rows.length) {
      return NextResponse.json(
        { error: "No rows provided." },
        { status: 400 }
      );
    }

    const results = [];

    for (const row of rows) {
      const productName = String(row.productName || "").trim();
      const features = String(row.features || "").trim();
      const tone = String(row.tone || "").trim();
      const language = String(row.language || "English").trim();

      if (!productName || !features) {
        continue;
      }

      const limit = await checkGenerationLimit(accessToken, "csv");
      if (!limit.allowed) {
        return NextResponse.json(
          {
            error: limit.reason,
            partialResults: results,
          },
          { status: 403 }
        );
      }

      const model = process.env.OPENAI_MODEL || "gpt-5-mini";

      const prompt = `
You are an expert eCommerce SEO copywriter.

Generate a JSON object for the following product.

Product name: ${productName}
Features: ${features}
Tone: ${tone || "Premium, conversion-focused"}
Language: ${language}

Return ONLY valid JSON with this exact shape:
{
  "seoTitle": string,
  "shortDescription": string,
  "longDescription": string,
  "metaTitle": string,
  "metaDescription": string,
  "tags": string[],
  "seoKeywords": string[],
  "instagramCaption": string
}

Rules:
- Write naturally and professionally.
- Optimize for eCommerce SEO.
- Keep seoTitle under 70 characters.
- Keep metaTitle under 60 characters.
- Keep metaDescription around 150-160 characters.
- shortDescription should be concise and sales-focused.
- longDescription should be more detailed and suitable for a product page.
- tags must be short and relevant.
- seoKeywords must be relevant search phrases.
- instagramCaption should be marketing-friendly and readable.
- Output language must be exactly: ${language}.
`;

      const response = await client.responses.create({
        model,
        input: prompt,
      });

      const text = response.output_text?.trim();

      if (!text) {
        continue;
      }

      let parsed: {
        seoTitle: string;
        shortDescription: string;
        longDescription: string;
        metaTitle: string;
        metaDescription: string;
        tags: string[];
        seoKeywords?: string[];
        instagramCaption?: string;
      };

      try {
        parsed = JSON.parse(text);
      } catch {
        continue;
      }

      await registerGeneration(accessToken, limit.type);

      await saveGenerationHistory({
        accessToken,
        productName,
        seoTitle: parsed.seoTitle,
        shortDescription: parsed.shortDescription,
        longDescription: parsed.longDescription,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        tags: parsed.tags || [],
        seoKeywords: parsed.seoKeywords || [],
        instagramCaption: parsed.instagramCaption || "",
        generationSource: "csv",
        usageType: limit.type,
      });

      results.push({
        productName,
        seoTitle: parsed.seoTitle,
        shortDescription: parsed.shortDescription,
        longDescription: parsed.longDescription,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        seoKeywords: (parsed.seoKeywords || []).join(", "),
        tags: (parsed.tags || []).join(", "),
        instagramCaption: parsed.instagramCaption || "",
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Generate bulk API error:", error);
    return NextResponse.json(
      { error: "Failed to generate bulk content." },
      { status: 500 }
    );
  }
}