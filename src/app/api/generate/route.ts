import OpenAI from "openai";
import { NextResponse } from "next/server";
import { checkGenerationLimit } from "../../../lib/data/generation-limit";
import { registerGeneration } from "../../../lib/data/register-generation";
import { saveGenerationHistory } from "../../../lib/data/save-generation-history";
import { sendEmail } from "../../../lib/email/sendEmail";
import { LimitReachedEmail } from "../../../lib/email/templates/limitReached";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const productName = String(body?.productName || "").trim();
    const features = String(body?.features || "").trim();
    const tone = String(body?.tone || "").trim();
    const language = String(body?.language || "English").trim();
    const keywords = String(body?.keywords || "").trim();
    const image = body?.image || null;

    const accessToken = String(body?.accessToken || "").trim();

    const generationSource =
      body?.generationSource === "csv"
        ? "csv"
        : image
        ? "image"
        : "manual";

    if (!image && (!productName || !features)) {
      return NextResponse.json(
        { error: "Product name and features are required." },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token." },
        { status: 401 }
      );
    }

    const limit = await checkGenerationLimit(accessToken, generationSource);
    

    if (!limit.allowed) {

  const { createClient } = await import("@supabase/supabase-js");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (user?.email) {

    const emailTemplate = LimitReachedEmail({
      name: user.user_metadata?.full_name || "there",
    });

    await sendEmail({
      to: user.email,
      subject: "You reached your Selliora free limit",
      react: emailTemplate,
    });

    console.log("LIMIT EMAIL SENT:", user.email);
  }

  return NextResponse.json({ error: limit.reason }, { status: 403 });
}
    const model = process.env.OPENAI_MODEL || "gpt-5-mini";

    const prompt = `
You are an expert eCommerce SEO copywriter.

Generate a JSON object for the product.

${
  image
    ? `
Analyze the product shown in the provided image.

Additional product information provided by the user:
Product name: ${productName || "unknown"}
Features: ${features || "none"}

Use BOTH the image and the provided information when generating the content.
`
    : `
Product name: ${productName}
Features: ${features}
`
}

Tone: ${tone || "Premium, conversion-focused"}
Language: ${language}
Keywords: ${keywords || "none"}

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
- longDescription should be detailed and suitable for a product page.
- tags must be short and relevant.
- seoKeywords must be relevant search phrases.
- instagramCaption should be marketing-friendly and readable.
- Output language must be exactly: ${language}.
`;

    const inputContent: any[] = [
      {
        type: "input_text",
        text: prompt,
      },
    ];

    if (image) {
      inputContent.push({
        type: "input_image",
        image_url: image,
      });
    }

    const response = await client.responses.create({
      model,
      input: [
        {
          role: "user",
          content: inputContent,
        },
      ],
    });

    const text = response.output_text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "No content returned from OpenAI." },
        { status: 500 }
      );
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
      return NextResponse.json(
        {
          error: "OpenAI returned invalid JSON.",
          raw: text,
        },
        { status: 500 }
      );
    }

    await registerGeneration(accessToken, limit.type);

    await saveGenerationHistory({
      accessToken,
      productName: image ? "Image Product" : productName,
      seoTitle: parsed.seoTitle,
      shortDescription: parsed.shortDescription,
      longDescription: parsed.longDescription,
      metaTitle: parsed.metaTitle,
      metaDescription: parsed.metaDescription,
      tags: parsed.tags || [],
      seoKeywords: parsed.seoKeywords || [],
      instagramCaption: parsed.instagramCaption || "",
      generationSource,
      usageType: limit.type,
    });

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}