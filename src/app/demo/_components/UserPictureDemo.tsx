import { formatUsername } from "@/lib/utils";

type UserPictureProps = {
  username: string;
};

export function UserPictureDemo({ username }: UserPictureProps) {
  return (
    <h3 className='text-xl font-medium rounded-md h-7 p-3 w-[200px] overflow-hidden flex items-center justify-center bg-primary/50'>
      {username}
    </h3>
  );
}
