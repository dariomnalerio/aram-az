"use server";

import { createClient } from "@/lib/supabase/server";
import { UserClubChamp } from "@/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getAllChampsFromClub(
  clubId: string
): Promise<PostgrestSingleResponse<UserClubChamp[]>> {
  const supabase = createClient();
  const response = await supabase
    .from("club_member_champion_played")
    .select("*")
    .eq("club_id", clubId);

  return response;
}
