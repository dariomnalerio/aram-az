"use server";

import { createClient } from "@/lib/supabase/server";
import { UserClub } from "@/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getAllUsersFromClub(
  clubId: string
): Promise<PostgrestSingleResponse<UserClub[]>> {
  const supabase = createClient();
  const response = await supabase.from("club_members").select("*").eq("club_id", clubId);

  return response;
}
