"use client";

import useQueryString from "@/hooks/useQueryString";
import { useRouter, useSearchParams } from "next/navigation";

// import Link from "next/link";

type UserPictureProps = {
  username: string;
  userId: string;
  clubId: string;
};

export function UserPicture({ username, userId, clubId }: UserPictureProps) {
  const { createQueryString } = useQueryString();
  const router = useRouter();

  const handleUserClick = () => {
    const newQueryString = createQueryString("user", userId);
    router.replace(`?${newQueryString}`);
  };

  return (
    <div
      aria-label={`See ${username}'s champion details for this club`}
      className='text-xl font-medium rounded-md h-7 p-3 w-[200px] overflow-hidden flex items-center justify-center bg-primary/50 cursor-pointer'
      onClick={handleUserClick}
    >
      <h3 className=''>{username}</h3>
    </div>
  );
}
