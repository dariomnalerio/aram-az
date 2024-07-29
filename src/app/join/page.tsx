// "use client";

import { redirect } from "next/navigation";
import { getUser, clubExists, getUserClubs, joinClub } from "../actions";
import { JoinClubForm } from "./_components/JoinClubForm";

type Props = {
  searchParams: {
    club: string;
  };
};

export default async function JoinClub({ searchParams: { club: clubId } }: Props) {
  const { user } = await getUser();

  if (!clubId) {
    return (
      <div className='text-4xl font-semibold flex justify-center items-center flex-1 mb-10'>
        <h1>Invalid invitation link</h1>
      </div>
    );
  }

  const club = await clubExists(clubId);

  if (!club) {
    return (
      <div className='text-4xl font-semibold flex flex-col gap-5 justify-center items-center flex-1 mb-10'>
        <h1>Invalid invation link</h1>
        <p className='text-2xl opacity-80'>The club you are trying to join does not exist.</p>
      </div>
    );
  }

  if (!user) {
    redirect(`/login?club=${clubId}`);
  }

  const { data: userClubs } = await getUserClubs(user.id, { name: true });
  const isUserInClub = userClubs?.find((c) => c.club_id === clubId);

  if (isUserInClub) {
    redirect(`/clubs?club=${clubId}`);
  }

  return (
    <div className='flex-1 flex flex-col items-center mt-20 gap-10'>
      <h1 className='text-4xl font-bold'>Join {club[0].name}</h1>
      <JoinClubForm clubId={clubId} userId={user.id} />
    </div>
  );
}
