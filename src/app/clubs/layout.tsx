import { redirect } from "next/navigation";
import { createClub, getUser, getUserClubs, leaveClub } from "../actions";
import { Option } from "@/types";
import { SelectClubSection } from "./_components/SelectClubSection";
import { InviteButton } from "./_components/InviteButton";
import { CreateClubDialog } from "@/components/Clubs/CreateClubDialog";
import { revalidatePath } from "next/cache";
import type { Metadata } from "next";
import { LeaveClubDialog } from "./_components/LeaveClubDialog";
import NoClub from "./_components/NoClub";

export const metadata: Metadata = {
  title: "Aram-AZ | Clubs",
  description: "Clubs page. Here you can see each club's data.",
};
type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
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

  return (
    <>
      {userClubs && userClubs.length > 0 && (
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
                <LeaveClubDialog userId={user.id} leaveClub={handleLeaveClub} />
                <CreateClubDialog userId={user.id} createClub={handleCreateClub} />
              </div>
            </div>
            {children}
          </div>
        </section>
      )}

      {userClubs && userClubs.length === 0 && <NoClub />}
    </>
  );
}
