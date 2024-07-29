import { redirect } from "next/navigation";
import { getUser, getUserClubs } from "../actions";
import { Option } from "@/types";
import { SelectClubSection } from "./_components/SelectClubSection";
import { Button } from "@/components/ui/button";
import { InviteButton } from "./_components/InviteButton";

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

  return (
    <section className='flex flex-col items-center'>
      <div className='flex justify-center gap-10 pt-16'>
        <h1 className='mb-4 text-3xl sm:text-4xl text-center font-semibold'>Explore Your Clubs</h1>
      </div>
      <div className='container'>
        <div className='flex gap-2 items-center'>
          <SelectClubSection options={options ?? []} />
          <InviteButton />
        </div>
        {children}
      </div>
    </section>
  );
}
