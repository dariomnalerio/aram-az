import { UserStats } from "@/app/clubs/_components/UserStats";
import { Champion } from "@/components/Champion";
import { UserPictureDemo } from "./UserPictureDemo";
import { ChampImg, DemoMember } from "@/types";

type Props = {
  member: DemoMember;
  champCount: number;
  imgs: ChampImg[];
};

export function HasClub({ member, champCount, imgs }: Props) {
  return (
    <div
      key={member.id}
      className='flex flex-col sm:flex-row items-center gap-4 border bg-primary/10 p-4 rounded-lg shadow-lg w-full'
    >
      <div className='flex flex-col gap-1 items-start sm:items-center justify-around p-2 rounded-md'>
        <UserPictureDemo username={member.username} userId={member.id} />
        <UserStats member={member} champCount={champCount!} />
      </div>

      {/* Latest played champs */}
      <div className='w-full'>
        <ul className='flex gap-1 flex-wrap justify-center sm:justify-normal'>
          {member.champions.length > 0 &&
            member.champions.slice(0, 15).map((champ) => (
              <li key={champ}>
                <Champion
                  key={champ}
                  url={imgs?.find((img) => img.id === champ)?.img_url ?? ""}
                  name={champ}
                />
              </li>
            ))}

          {member.champions.length === 0 && (
            <li className='text-lg text-pretty text-center w-full'>
              <span className='text-primary/80 font-medium'>{member.username}</span> has not played
              any champions yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
