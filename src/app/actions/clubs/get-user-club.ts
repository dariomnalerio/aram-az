"use server";

import { createClient } from "@/lib/supabase/server";
import { UserClub } from "@/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getUserClub({
  userId,
  clubId,
}: {
  userId: string;
  clubId: string;
}): Promise<PostgrestSingleResponse<UserClub>> {
  const supabase = createClient();

  const response = await supabase
    .from("club_members")
    .select("*")
    .eq("user_id", userId)
    .eq("club_id", clubId);

  return {
    ...response,
    data: response.data?.[0],
  };
}
