"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  userId: string;
};

export function ProfileBtn({ userId }: Props) {
  const searchParams = useSearchParams();
  const club = searchParams.get("club");

  if (club) {
    return (
      <Button className='w-20 text-foreground transition hover:scale-105' asChild>
        <Link href={`/user/${userId}?club=${club}`}>Profile</Link>
      </Button>
    );
  }

  return (
    <Button className='w-20 text-foreground transition hover:scale-105' asChild>
      <Link href={`/user/${userId}`}>Profile</Link>
    </Button>
  );
}
