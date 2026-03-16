import { createClient } from "@supabase/supabase-js";

type SaveGenerationHistoryInput = {
  accessToken: string;
  productName: string;
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  seoKeywords?: string[];
  instagramCaption?: string;
  generationSource: "csv" | "manual" | "image";
  usageType: "demo" | "pro" | "credits";
};

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function saveGenerationHistory(
  input: SaveGenerationHistoryInput
) {
  const supabase = getServerSupabase();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(input.accessToken);

  if (userError || !user) {
    throw new Error("User not authenticated for history save.");
  }

  const { error } = await supabase.from("generation_history").insert({
    user_id: user.id,
    product_name: input.productName,
    seo_title: input.seoTitle,
    short_description: input.shortDescription,
    long_description: input.longDescription,
    meta_title: input.metaTitle,
    meta_description: input.metaDescription,
    tags: input.tags,
    seo_keywords: input.seoKeywords || [],
    instagram_caption: input.instagramCaption || null,
    generation_source: input.generationSource || "manual",
    usage_type: input.usageType,
  });

  if (error) {
    throw new Error(error.message);
  }
}