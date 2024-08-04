import { formatUsername } from "@/lib/utils";

type UserPictureProps = {
  username: string;
};

export function UserPictureDemo({ username }: UserPictureProps) {
  const formattedUsername = formatUsername(username);
  return (
    <h3 className='text-xl font-medium rounded-md h-7 p-3 w-[120px] overflow-hidden flex items-center justify-center bg-primary/50'>
      {formattedUsername}
    </h3>
  );
}
