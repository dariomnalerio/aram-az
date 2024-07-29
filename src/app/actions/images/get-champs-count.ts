"use server";

import { createClient } from "@/lib/supabase/server";

export async function getChampsCount() {
  const supabase = createClient();

  const count = (await supabase.from("champions").select("id, name, img_url")).data?.length;

  return count;
}
