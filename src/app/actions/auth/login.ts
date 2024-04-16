import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const handleLogin = async (provider: "discord" | "google") => {
  "use server";
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
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

export async function handleDiscordLogin() {
  "use server";
  await handleLogin("discord");
};

export async function handleGoogleLogin() {
  "use server";
  await handleLogin("google");
};