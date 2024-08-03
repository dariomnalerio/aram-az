import React from "react";
import { Button } from "../ui/button";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { getUser, handleLogout } from "@/app/actions/";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default async function Header() {
  const { user } = await getUser();

  return (
    <header>
      <nav className='flex items-center justify-between px-3 py-5 shadow-lg sm:px-5 md:px-10'>
        <div>
          <Link href='/' className='flex gap-1 sm:gap-2 md:gap-4'>
            <div className='relative h-4 w-4'>
              <Image src={logo} alt='ARAM-AZ Logo' className='flex' />
            </div>
            <span className='md:text-md text-xs font-semibold'>ARAM-AZ</span>
          </Link>
        </div>

        <div className='hidden sm:flex items-center gap-3 md:gap-8'>
          <div className='hidden gap-9 min-[600px]:flex'>
            {!user && (
              <Link href='#' className='hover:underline underline-offset-4'>
                Demo
              </Link>
            )}
            {user && (
              <Link href='/clubs' className='hover:underline underline-offset-4'>
                Clubs
              </Link>
            )}
          </div>

          {!user && (
            <Button className='w-20 text-foreground transition hover:scale-105' asChild>
              <Link href={`/login`}>Log in</Link>
            </Button>
          )}

          {user && (
            <>
              <Button className='w-20 text-foreground transition hover:scale-105' asChild>
                <Link href={`/user/${user.id}`}>Profile</Link>
              </Button>
              <form action={handleLogout}>
                <Button
                  className='w-20 text-foreground transition hover:scale-105'
                  variant={"destructive"}
                >
                  Log out
                </Button>
              </form>
            </>
          )}
        </div>

        {/* Mobile hamburger menu*/}
        <div className='sm:hidden'>
          <DropdownMenu dir='ltr'>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col items-center gap-1 bg-background p-4'>
              {!user && (
                <DropdownMenuItem>
                  <Link href='#'>Demo</Link>
                </DropdownMenuItem>
              )}

              {!user && (
                <DropdownMenuItem>
                  <Link href={`/login`}>Log in</Link>
                </DropdownMenuItem>
              )}

              {user && (
                <>
                  <DropdownMenuItem>
                    <Button asChild variant={"outline"} size={"sm"} className='text-sm w-20'>
                      <Link href='/clubs'>Clubs</Link>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Button size={"sm"} className='text-sm w-20' asChild>
                      <Link href={`/user/${user.id}`}>Profile</Link>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <form action={handleLogout}>
                      <Button variant={"destructive"} size={"sm"} className='text-sm w-20'>
                        Log out
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <Separator className='h-[0.1px] w-full bg-primary/20' />
    </header>
  );
}
