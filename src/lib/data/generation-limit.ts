import { createClient } from "@supabase/supabase-js";

export type GenerationCheck =
  | { allowed: true; type: "demo" | "pro" | "credits" }
  | { allowed: false; reason: string };

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function isNewMonth(lastResetAt: string | null | undefined) {
  if (!lastResetAt) return true;

  const last = new Date(lastResetAt);
  const now = new Date();

  return (
    last.getUTCFullYear() !== now.getUTCFullYear() ||
    last.getUTCMonth() !== now.getUTCMonth()
  );
}

export async function checkGenerationLimit(
  accessToken: string,
  generationSource: "manual" | "image" | "csv"
): Promise<GenerationCheck> {

 const supabase = getServerSupabase();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return { allowed: false, reason: "Not authenticated." };
  }

  const { data: usage, error } = await supabase
    .from("user_usage")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !usage) {
    return { allowed: false, reason: "Usage record not found." };
  }

  // reset lunar automat pentru Pro
  if (usage.plan_type === "pro" && isNewMonth(usage.last_monthly_reset_at)) {
    const { error: resetError } = await supabase
      .from("user_usage")
      .update({
        monthly_products_used: 0,
        last_monthly_reset_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (resetError) {
      return { allowed: false, reason: "Failed to reset monthly usage." };
    }

    usage.monthly_products_used = 0;
    usage.last_monthly_reset_at = new Date().toISOString();
  }

  // DEMO PLAN
if (usage.plan_type === "demo") {

  // primele 3 generări gratuite
  if (usage.demo_generations_used < 3) {
    return { allowed: true, type: "demo" };
  }

  // după demo folosim credite
  if (usage.credits_balance >= 10) {
    return { allowed: true, type: "credits" };
  }

  return {
    allowed: false,
    reason: "Free demo limit reached. Buy credits or upgrade to continue.",
  };
}

  // PRO PLAN
  if (usage.plan_type === "pro") {
    if (usage.monthly_products_used < usage.monthly_product_limit) {
      return { allowed: true, type: "pro" };
    }

    if (usage.credits_balance >= 10) {
      return { allowed: true, type: "credits" };
    }

    return {
      allowed: false,
      reason: "Monthly Pro limit reached. Buy credits to continue.",
    };
  }

  if (usage.credits_balance >= 10) {
    return { allowed: true, type: "credits" };
  }

  return {
    allowed: false,
    reason: "You do not have enough credits to generate content.",
  };
}