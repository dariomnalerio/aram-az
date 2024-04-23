"use server"
import { PlayedChamps } from "@/types/types";
import { createClient } from "@/lib/supabase/server";

type AddPlayedChampsToClub = {
  clubId: string;
  userId: string;
  champsToAdd: PlayedChamps;

}

export async function addPlayedChampsToClub({ clubId, userId, champsToAdd }: AddPlayedChampsToClub) {

  if (!clubId || !userId || !champsToAdd) {
    throw new Error("Missing required fields");
  }

  const supabase = createClient();

  const data = champsToAdd.map((champ) => ({
    user_id: userId,
    club_id: clubId,
    champion_id: champ.champion_id,
  }))


  const response = await supabase.from("club_member_champion_played").upsert(data)

  return response
}