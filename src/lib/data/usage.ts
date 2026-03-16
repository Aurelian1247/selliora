import { supabase } from "../supabase/client";

export type UserUsage = {
  id: string;
  plan_type: "demo" | "pro";
  demo_generations_used: number;
  monthly_products_used: number;
  monthly_product_limit: number;
  credits_balance: number;
};

export async function getCurrentUserUsage() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { usage: null, error: "User not found." };
  }

  const { data, error } = await supabase
    .from("user_usage")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return { usage: null, error: error.message };
  }

  return { usage: data as UserUsage, error: null };
}