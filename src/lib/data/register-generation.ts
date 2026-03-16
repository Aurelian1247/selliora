import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function registerGeneration(
  accessToken: string,
  type: "demo" | "pro" | "credits"
) {
  const supabase = getServerSupabase();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    console.error("REGISTER GENERATION: user error", userError);
    return;
  }

  console.log("REGISTER GENERATION TYPE:", type);
  console.log("USER ID:", user.id);

  if (type === "demo") {
    const { error } = await supabase.rpc("increment_demo_generation", {
      user_id: user.id,
    });

    if (error) {
      console.error("DEMO RPC ERROR:", error);
    } else {
      console.log("DEMO GENERATION REGISTERED");
    }
  }

  if (type === "pro") {
    const { error } = await supabase.rpc("increment_monthly_products", {
      user_id: user.id,
    });

    if (error) {
      console.error("PRO RPC ERROR:", error);
    } else {
      console.log("PRO GENERATION REGISTERED");
    }
  }

  if (type === "credits") {
    const { error } = await supabase.rpc("consume_credits", {
      user_id: user.id,
    });

    if (error) {
      console.error("CREDITS RPC ERROR:", error);
    } else {
      console.log("10 CREDITS CONSUMED FOR USER:", user.id);
    }
  }
}