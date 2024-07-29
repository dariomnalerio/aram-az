"use server";

import { createClient } from "@/lib/supabase/server";

type JoinClubDto = {
  clubId: string;
  userId: string;
  username: string;
};

export async function joinClub({ clubId, userId, username }: JoinClubDto) {
  const supabase = createClient();
  const response = await supabase
    .from("club_members")
    .insert([{ club_id: clubId, user_id: userId, username }]);

  console.log("Join club response", JSON.stringify(response, null, 1));

  return response;
}
