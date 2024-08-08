"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ClubBtn() {
  const searchParams = useSearchParams();
  const club = searchParams.get("club");

  if (club) {
    return (
      <Link href={`/clubs?club=${club}`} className='hover:underline underline-offset-4'>
        Clubs
      </Link>
    );
  }

  return (
    <Link href={`/clubs`} className='hover:underline underline-offset-4'>
      Clubs
    </Link>
  );
}
