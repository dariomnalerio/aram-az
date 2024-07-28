"use server";

import { createClient } from "@/lib/supabase/server";
import { Club } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUserClubs(
  userId: string,
  options?: { name?: boolean }
): Promise<{ data: Club[] | null; error: PostgrestError | null }> {
  if (!userId) throw new Error("User ID is required");

  const supabase = createClient();

  const { data, error } = await supabase.from("club_members").select("*").eq("user_id", userId);

  // If the name option is set to true, we will fetch the club name from the clubs table
  if (options?.name && data) {
    const clubIds = data.map((club) => club.club_id);
    const { data: clubs, error: clubError } = await supabase
      .from("clubs")
      .select("name, id")
      .in("id", clubIds);

    if (clubs) {
      data.forEach((club) => {
        const clubName = clubs.find((c) => c.id === club.club_id)?.name;
        if (clubName) {
          club.name = clubName;
        }
      });
    }
  }

  return { data, error };
}
