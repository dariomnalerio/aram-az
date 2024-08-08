import { redirect } from "next/navigation";
import { createClub, getAllClubInfo, getUser, getUserClubs, leaveClub } from "../actions";
import { Option } from "@/types";
import { SelectClubSection } from "./_components/SelectClubSection";
import { InviteButton } from "./_components/InviteButton";
import { CreateClubDialog } from "@/components/Clubs/CreateClubDialog";
import { revalidatePath } from "next/cache";
import type { Metadata } from "next";
import { LeaveClubDialog } from "./_components/LeaveClubDialog";
import { NoClub } from "./_views/NoClub";
import { UserInfoList } from "./_components/ClubView";
import { Suspense } from "react";
import { HeaderSkeleton } from "./_components/HeaderSkeleton";
import Loading from "./loading";
import { HasClub } from "./_views/HasClub";
import UserDataShowcase from "./_views/UserDataShowcase";

export const metadata: Metadata = {
  title: "Aram-AZ | Clubs",
  description: "Clubs page. Here you can see each club's data.",
};
type Props = {
  searchParams: {
    club: string;
    user: string;
  };
};

export default async function layout({ searchParams }: Props) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: userClubs } = await getUserClubs(user.id, { name: true });
  let options: Option[] = [];
  if (userClubs) {
    options = userClubs.map((club) => ({
      value: club.club_id,
      label: club.name!,
    }));
  }

  const { data: clubInfo } = await getAllClubInfo({
    clubId: searchParams.club ?? userClubs?.[0].club_id!,
    userId: user.id,
  });

  const userIsInClub = userClubs && userClubs.length > 0;

  return (
    <>
      <Suspense fallback={<Loading />}>
        {userIsInClub && searchParams.user && searchParams.club && (
          <UserDataShowcase clubId={searchParams.club} userId={searchParams.user} />
        )}

        {userIsInClub && !searchParams.user && (
          <HasClub
            options={options}
            userId={user.id}
            clubId={searchParams.club ?? userClubs?.[0].club_id!}
            clubInfo={clubInfo!}
          />
        )}

        {!userIsInClub && <NoClub userId={user.id} />}
      </Suspense>
    </>
  );
}
