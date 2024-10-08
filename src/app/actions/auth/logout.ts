"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function handleLogout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error.message);
  }

  redirect("/login");

}