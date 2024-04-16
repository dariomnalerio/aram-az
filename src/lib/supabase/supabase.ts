import { env } from "@/config";
import { createClient as _createClient, SupabaseClient } from "@supabase/supabase-js";

export const createClient = () => {
  return _createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}