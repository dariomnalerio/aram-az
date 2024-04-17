"use server"
import { createClient } from "@/lib/supabase/server";

type Props = {
  clubId: string;
  userId: string;
};

export async function getUserPlayedChampsByClub({ clubId, userId }: Props) {
  if (!userId || !clubId) {
    return;
  }
  const supabase = createClient();

  const response = await supabase
    .from('club_member_champion_played')
    .select('champion_id')
    .eq('user_id', userId)
    .eq('club_id', clubId);


  return response
}