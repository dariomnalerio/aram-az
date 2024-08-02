import { redirect } from "next/navigation";
import { createClub, getUser, getUserClubs } from "../actions";
import { Option } from "@/types";
import { SelectClubSection } from "./_components/SelectClubSection";
import { Button } from "@/components/ui/button";
import { InviteButton } from "./_components/InviteButton";
import { CreateClubDialog } from "@/components/Clubs/CreateClubDialog";
import { revalidatePath } from "next/cache";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const { user } = await getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: userClubs } = await getUserClubs(user.id, { name: true });
  if (!userClubs) return null; // TODO

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

  return (
    <section className='flex flex-col items-center mx-4'>
      <div className='flex justify-center gap-10 pt-10 pb-16'>
        <h1 className=' text-3xl sm:text-4xl text-center font-semibold'>Explore Your Clubs</h1>
      </div>
      <div className='container'>
        <div className='flex gap-2 items-center justify-center sm:justify-between flex-wrap'>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <SelectClubSection options={options ?? []} />
            <InviteButton />
          </div>

          <CreateClubDialog userId={user.id} createClub={handleCreateClub} />
        </div>
        {children}
      </div>
    </section>
  );
}
