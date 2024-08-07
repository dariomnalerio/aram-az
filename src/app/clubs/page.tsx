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

export const metadata: Metadata = {
  title: "Aram-AZ | Clubs",
  description: "Clubs page. Here you can see each club's data.",
};
type Props = {
  searchParams: {
    club: string;
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

  const handleCreateClub = async (formData: FormData) => {
    "use server";
    await createClub(formData);
    revalidatePath("/clubs");
  };

  const handleLeaveClub = async (formData: FormData) => {
    "use server";
    const { status } = await leaveClub(formData);

    if (status === 204) {
      revalidatePath("/clubs");
    }
  };

  const { data: clubInfo } = await getAllClubInfo({
    clubId: searchParams.club ?? userClubs?.[0].club_id!,
    userId: user.id,
  });

  return (
    <>
      <Suspense fallback={<Loading />}>
        {userClubs && userClubs.length > 0 && (
          <HasClub
            options={options}
            userId={user.id}
            clubId={searchParams.club ?? userClubs?.[0].club_id!}
            clubInfo={clubInfo!}
          />
        )}

        {userClubs && userClubs.length === 0 && <NoClub userId={user.id} />}
      </Suspense>
    </>
  );
}
