"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import discordIcon from "@/assets/discord-ico.svg";
import googleIcon from "@/assets/google-ico.svg";

type ProviderButtonProps = {
  provider: "discord" | "google";
  handleLogin: (clubId: string) => void;
  clubId?: string;
};

export default function ProviderButton({ provider, handleLogin, clubId }: ProviderButtonProps) {
  const icon = provider === "discord" ? discordIcon : googleIcon;

  return (
    <Button
      onClick={() => handleLogin(clubId ?? "")}
      size={"xl"}
      variant={"outline"}
      type='button'
      className='w-full max-w-xs mt-2'
    >
      <Image src={icon} alt='Discord icon' className='mr-3 h-5 w-5' />
      Sign in with&nbsp;
      <span className='capitalize'>{provider}</span>
    </Button>
  );
}
