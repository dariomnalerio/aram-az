"use server";

import { createClient } from "@/lib/supabase/server";
import { Club } from "@/types";

export async function clubExists(clubId: string): Promise<Club[] | null> {
  const supabase = createClient();
  const { data } = await supabase.from("clubs").select("*").eq("id", clubId);

  return data;
}
