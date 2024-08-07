import { CreateClubDialog } from "@/components/Clubs/CreateClubDialog";
import React from "react";
import { UserInfoList } from "../_components/ClubView";
import { InviteButton } from "../_components/InviteButton";
import { LeaveClubDialog } from "../_components/LeaveClubDialog";
import { SelectClubSection } from "../_components/SelectClubSection";
import { createClub, leaveClub } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { ClubMemberWithChampions, Options } from "@/types";

type Props = {
  options: Options[];
  userId: string;
  clubId: string;
  clubInfo: ClubMemberWithChampions[];
};

export function HasClub({ options, userId, clubId, clubInfo }: Props) {
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

  return (
    <section className='flex flex-col items-center mx-4 mb-20'>
      <div className='flex justify-center gap-10 pt-10 pb-16'>
        <h1 className=' text-3xl sm:text-4xl text-center font-semibold'>Explore Your Clubs</h1>
      </div>
      <div className='container'>
        <div className='flex gap-6 md:gap-2 items-center justify-center md:justify-between flex-wrap'>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <SelectClubSection options={options ?? []} />
            <InviteButton />
          </div>
          <div className='flex gap-2'>
            <LeaveClubDialog userId={userId} leaveClub={handleLeaveClub} />
            <CreateClubDialog userId={userId} createClub={handleCreateClub} />
          </div>
        </div>
        <UserInfoList clubId={clubId} clubInfo={clubInfo} />
      </div>
    </section>
  );
}
