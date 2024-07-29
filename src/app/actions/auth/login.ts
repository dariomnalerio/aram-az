"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const handleLogin = async (provider: "discord" | "google", clubId?: string) => {
  const supabase = createClient();
  const origin = headers().get("origin");

  const redirectUrl = clubId ? `${origin}/auth/callback?club=${clubId}` : `${origin}/auth/callback`;

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    return;
  } else {
    // Redirect to the URL provided by the OAuth provider
    redirect(data.url);
  }
};

export async function handleDiscordLogin(clubId?: string) {
  "use server";
  await handleLogin("discord", clubId);
}

export async function handleGoogleLogin(clubId?: string) {
  "use server";
  await handleLogin("google", clubId);
}
