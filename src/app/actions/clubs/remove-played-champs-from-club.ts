"use server";
import { PlayedChamps } from "@/types/types";
import { createClient } from "@/lib/supabase/server";

type RemovePlayedChampsToClub = {
  clubId: string;
  userId: string;
  champsToDelete: PlayedChamps;
};

export async function removePlayedChampsFromClub({
  clubId,
  userId,
  champsToDelete,
}: RemovePlayedChampsToClub) {
  if (!clubId || !userId || !champsToDelete || champsToDelete?.length < 1) {
    throw new Error("Missing required fields");
  }

  const supabase = createClient();

  const data = champsToDelete.map((champ) => ({
    user_id: userId,
    club_id: clubId,
    champion_id: champ.champion_id,
  }));
  const response = await supabase
    .from("club_member_champion_played")
    .delete()
    .eq("user_id", userId)
    .eq("club_id", clubId)
    .in(
      "champion_id",
      champsToDelete.map((champ) => champ.champion_id)
    );

  return response;
}
