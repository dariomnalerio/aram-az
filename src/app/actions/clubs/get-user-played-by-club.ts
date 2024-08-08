"use server";
import { createClient } from "@/lib/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Props = {
  clubId: string;
  userId: string;
};

export async function getUserPlayedChampsByClub({
  clubId,
  userId,
}: Props): Promise<PostgrestSingleResponse<{ champion_id: string }[]>> {
  if (!userId || !clubId) {
    throw new Error("Missing required fields");
  }
  const supabase = createClient();

  const response = await supabase
    .from("club_member_champion_played")
    .select("champion_id")
    .eq("user_id", userId)
    .eq("club_id", clubId);

  return response;
}
