"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteClub(clubId: string) {
  const supabase = createClient();
  const response = await supabase.from("clubs").delete().eq("id", clubId);

  if (response.error) {
    console.log(response.error);
  }

  return response;
}
