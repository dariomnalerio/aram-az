import { createClient } from "@/lib/supabase/server";

export async function getUserClubs(userId: string) {
  "use server"
  const supabase = createClient();

  const { data, error } = await supabase
    .from("club_members")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
}