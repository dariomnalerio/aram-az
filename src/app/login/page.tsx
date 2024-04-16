import logo from "@/assets/logo.svg";
import Image from "next/image";
import ProviderButton from "./_components/ProviderButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function page() {
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

  const handleDiscordLogin = async () => {
    "use server";
    await handleLogin("discord");
  };

  const handleGoogleLogin = async () => {
    "use server";
    await handleLogin("google");
  };

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='mb-5 flex flex-col items-center gap-3'>
        <div className=' flex items-center justify-center gap-2'>
          <Image src={logo} alt='ARAM-AZ Logo' className='h-6 w-6' />
          <h2 className='text-bold text-4xl'>ARAM-AZ</h2>
        </div>
        <p className='text-xl font-medium text-blue-200'>Please sign in to continue.</p>
      </div>
      <ProviderButton provider='discord' handleLogin={handleDiscordLogin} />
      <ProviderButton provider='google' handleLogin={handleGoogleLogin} />
    </div>
  );
}
