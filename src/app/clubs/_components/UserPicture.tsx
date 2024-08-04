import { formatUsername } from "@/lib/utils";
import Link from "next/link";

type UserPictureProps = {
  username: string;
  userId: string;
  clubId: string;
};

export function UserPicture({ username, userId, clubId }: UserPictureProps) {
  const formattedUsername = formatUsername(username);
  return (
    <Link
      href={`/user/${userId}?club=${clubId}`}
      aria-label={`Go to ${username}'s profile`}
      className='text-xl font-medium rounded-md h-7 p-3 w-[120px] overflow-hidden flex items-center justify-center bg-primary/50'
    >
      <h3 className=''>{formattedUsername}</h3>
    </Link>
  );
}
