"use server";
import { PlayedChamps } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  const response = await supabase
    .from("club_member_champion_played")
    .delete()
    .eq("user_id", userId)
    .eq("club_id", clubId)
    .in(
      "champion_id",
      champsToDelete.map((champ) => champ.champion_id)
    );

  revalidatePath(`/clubs/${clubId}`);

  return response;
}
