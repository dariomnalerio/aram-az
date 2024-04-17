"use server"
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  return { user: user, error };
}