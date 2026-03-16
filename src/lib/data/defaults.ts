import { supabase } from "../supabase/client";

export type UserDefaults = {
  default_language: string;
  default_tone: string;
};

export async function getUserDefaults() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { defaults: null, error: "User not found." };
  }

  const { data, error } = await supabase
    .from("user_usage")
    .select("default_language, default_tone")
    .eq("id", user.id)
    .single();

  if (error) {
    return { defaults: null, error: error.message };
  }

  return {
    defaults: data as UserDefaults,
    error: null,
  };
}