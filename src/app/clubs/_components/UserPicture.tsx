import Link from "next/link";

type UserPictureProps = {
  username: string;
  userId: string;
  clubId: string;
};

export function UserPicture({ username, userId, clubId }: UserPictureProps) {
  const formatUsername = (username: string) => {
    const splitName = username.split(" ");
    return `${splitName[0].slice(0, 4)}...`;
  };

  const formattedUsername = formatUsername(username);
  return (
    <Link
      href={`/user/${userId}?club=${clubId}`}
      aria-label={`Go to ${username}'s profile`}
      className='text-xl font-medium rounded-md w-16 h-7 flex justify-center items-center bg-primary/50'
    >
      <h3 className=''>{formattedUsername}</h3>
    </Link>
  );
}
