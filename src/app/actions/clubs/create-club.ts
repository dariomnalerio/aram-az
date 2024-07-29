"use server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { joinClub } from "./join-club";

export async function createClub(formData: FormData) {
  const supabase = createClient();

  const schema = z.object({
    clubName: z.string().min(1, { message: "Club name is required" }),
    userId: z.string().min(1),
  });

  const formRawData = schema.parse({
    clubName: formData.get("clubName"),
    userId: formData.get("userId"),
  });

  //TODO: toasts and error handling

  const { status } = await supabase
    .from("clubs")
    .insert({ name: formRawData.clubName, club_owner_id: formRawData.userId });
  if (status === 201) {
    const { data } = await supabase.from("clubs").select("id").eq("name", formRawData.clubName);
    if (data) {
      const clubId = data[0].id;
      const { status } = await joinClub({
        clubId,
        userId: formRawData.userId,
        username: "Unknown",
      }); //TODO: add username to club creation
    }
  }
}
