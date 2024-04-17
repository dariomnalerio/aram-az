"use server"

import { createClient } from "@/lib/supabase/server";

export async function getChampImages() {
  const supabase = createClient();

  const response = await supabase
    .from('champions')
    .select('id, name, img_url')
    .order('name', { ascending: true });

  return response
};
