import { Champion } from "@/components/Champion";
import { getAllClubInfo, getChampImagesByIds, getChampsCount, getUser } from "../actions";
import { UserPicture } from "./_components/UserPicture";
import { UserStats } from "./_components/UserStats";

type Props = {
  searchParams: {
    club: string;
  };
};
export default async function ClubView({ searchParams: { club: clubId } }: Props) {
  const { user } = await getUser();
  if (!user || !clubId) {
    return null;
  }

  const { data: clubInfo } = await getAllClubInfo({
    clubId,
    userId: user.id,
  });

  if (!clubInfo) {
    return null;
  }

  const { data: champImgs } = await getChampImagesByIds(
    clubInfo?.map((member) => member.champions).flat() ?? []
  );

  const champCount = await getChampsCount();

  return (
    <div className='mt-10'>
      {clubInfo?.map((member) => (
        <div
          key={member.userId}
          className='flex flex-col sm:flex-row items-center gap-4 border bg-primary/10 p-4 rounded-lg shadow-lg w-full'
        >
          <div className='flex flex-col gap-1 items-start sm:items-center justify-around p-2 rounded-md'>
            <UserPicture username={member.username} userId={member.userId} clubId={clubId} />
            <UserStats member={member} champCount={champCount!} />
          </div>

          {/* Latest played champs */}
          <div className='w-full'>
            <ul className='flex gap-1 flex-wrap justify-center sm:justify-normal'>
              {member.champions.length > 0 &&
                member.champions.slice(0, 12).map((champ) => (
                  <li key={champ}>
                    <Champion
                      key={champ}
                      url={champImgs?.find((img) => img.id === champ)?.img_url ?? ""}
                      name={champ}
                    />
                  </li>
                ))}

              {member.champions.length === 0 && (
                <li className='text-lg'>
                  <span className='font-medium text-primary/80'>{member.username}</span> has not
                  played any champions yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
