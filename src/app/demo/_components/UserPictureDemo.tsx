"use client";

import useQueryString from "@/hooks/useQueryString";
import { useRouter } from "next/navigation";

type UserPictureProps = {
  username: string;
  userId: string;
};

export function UserPictureDemo({ username, userId }: UserPictureProps) {
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
      <h3>{username}</h3>
    </div>
  );
}
