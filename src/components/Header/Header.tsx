import React from "react";
import { Button } from "../ui/button";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function Header() {
  const user = true;

  return (
    <header>
      <nav className='flex items-center justify-between px-3 py-5 shadow-lg sm:px-5 md:px-10'>
        <div>
          <Link href='/' className='flex sm:gap-2 md:gap-4'>
            <div className='relative h-4 w-4'>
              <Image src={logo} alt='ARAM-AZ Logo' className='hidden sm:flex' />
            </div>
            <span className='md:text-md text-xs font-semibold'>ARAM-AZ</span>
          </Link>
        </div>
        <div className='flex items-center gap-3 md:gap-8'>
          <div className='hidden gap-9 min-[600px]:flex'>
            <Link href='#' className='transition hover:scale-105'>
              {" "}
              How it works{" "}
            </Link>
            <Link href='#' className='transition hover:scale-105'>
              {" "}
              Leaderboard{" "}
            </Link>
          </div>

          {!user && (
            <Button className='w-20 text-foreground transition hover:scale-105' asChild>
              <Link href={`/login`}>Log in</Link>
            </Button>
          )}

          {user && (
            <>
              <Button className='w-20 text-foreground transition hover:scale-105' asChild>
                <Link href={`/user/`}>Profile</Link>
              </Button>
              <Button
                className='w-20 text-foreground transition hover:scale-105'
                variant={"destructive"}
              >
                Log out
              </Button>
            </>
          )}
        </div>
      </nav>
      <Separator className='h-[0.2px] w-full bg-foreground/70' />
    </header>
  );
}
