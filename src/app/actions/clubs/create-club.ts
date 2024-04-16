"use server"
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function createClub(formData: FormData) {
  const supabase = createClient();

  const schema = z.object({
    clubName: z.string().min(1, { message: "Club name is required" }),
    userId: z.string().min(1),
  });

  const formRawData = schema.parse({
    clubName: formData.get('clubName'),
    userId: formData.get('userId'),
  });

  //TODO: toasts and error handling

  // Create a new club
  const { status } = await supabase.from('clubs').insert({ name: formRawData.clubName, club_owner_id: formRawData.userId });
  if (status === 201) {
    // Get the club id
    const { data } = await supabase.from('clubs').select('id').eq('name', formRawData.clubName);
    if (data) {
      const clubId = data[0].id;
      // Add the user to the club
      const { status } = await supabase.from('club_members').insert({ user_id: formRawData.userId, club_id: clubId });
    }
  }
};

