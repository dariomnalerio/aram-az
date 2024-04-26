import { getUserClubs } from "@/app/actions";
import { ClubSection } from "../_components/hasClub/ClubSection";
import { Option } from "@/types/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  let options: Option[] = [];
  const { data: userClubs } = await getUserClubs(params.id, { name: true });

  if (userClubs) {
    options = userClubs.map((club) => ({
      value: club.club_id,
      label: club.name,
    }));
  }

  return (
    <section className='flex flex-1 items-center flex-col pt-16'>
      <div className='flex flex-col'>
        <h1 className='mb-4 text-4xl text-center font-semibold'>Champion Challenge</h1>
      </div>

      {/* Reactive section*/}
      <ClubSection options={options ?? []} />
    </section>
  );
}
