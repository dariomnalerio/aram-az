"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { deleteClub } from "./delete-club";

export async function leaveClub(formData: FormData) {
  const supabase = createClient();
  const schema = z.object({
    userId: z.string().min(1),
    clubId: z.string().min(1),
  });

  const formRawData = schema.parse({
    userId: formData.get("userId"),
    clubId: formData.get("clubId"),
  });

  const { userId, clubId } = formRawData;

  // check if user is owner
  const { data: clubData } = await supabase.from("clubs").select("*").eq("id", clubId);

  if (clubData && clubData[0].club_owner_id === userId) {
    return {
      error: "Cannot leave club as owner while there are members in the club",
      status: 400,
    };
  }

  const response = await supabase
    .from("club_members")
    .delete()
    .eq("user_id", userId)
    .eq("club_id", clubId);

  if (response.error) {
    console.log(response.error);
  }

  const { data: clubMembers } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", clubId);

  if (clubMembers && clubMembers.length === 1) {
    await deleteClub(clubId);
  }

  return response;
}
