import { formatUsername } from "@/lib/utils";
import Link from "next/link";

type UserPictureProps = {
  username: string;
  userId: string;
  clubId: string;
};

export function UserPicture({ username, userId, clubId }: UserPictureProps) {
  return (
    <Link
      href={`/user/${userId}?club=${clubId}`}
      aria-label={`Go to ${username}'s profile`}
      className='text-xl font-medium rounded-md h-7 p-3 w-[200px] overflow-hidden flex items-center justify-center bg-primary/50'
    >
      <h3 className=''>{username}</h3>
    </Link>
  );
}
