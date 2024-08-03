"use server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { joinClub } from "./join-club";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export async function createClub(formData: FormData) {
  const supabase = createClient();

  const schema = z.object({
    clubName: z.string().min(1, { message: "Club name is required" }),
    username: z.string().min(3).max(20),
    userId: z.string().min(1),
  });

  const formRawData = schema.parse({
    clubName: formData.get("clubName"),
    username: formData.get("username"),
    userId: formData.get("userId"),
  });

  const { status } = await supabase
    .from("clubs")
    .insert({ name: formRawData.clubName, club_owner_id: formRawData.userId });

  if (status === 201) {
    const { data } = await supabase.from("clubs").select("id").eq("name", formRawData.clubName);

    if (data) {
      const clubId = data[0].id;
      await joinClub({
        clubId,
        userId: formRawData.userId,
        username: formRawData.username,
      });

      revalidatePath("/clubs");
      revalidatePath(`/user/${formRawData.userId}`);
    }
  }
}
