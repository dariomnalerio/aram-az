import { getUserClubs } from "@/app/actions";
import { ClubSection } from "../_components/hasClub/ClubSection";
import { Option } from "@/types";
import { Suspense } from "react";
import Loading from "./loading";
import SectionLayout from "@/components/Layout/SectionLayout";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  let options: Option[] = [];
  const { data: userClubs } = await getUserClubs(params.id, { name: true });

  if (userClubs) {
    options = userClubs.map((club) => ({
      value: club.club_id,
      label: club.name!,
    }));
  }

  return (
    <Suspense fallback={<Loading />}>
      <SectionLayout>
        <div className='flex flex-col'>
          <h1 className='mb-4 text-3xl sm:text-4xl text-center font-semibold'>
            Champion Challenge
          </h1>
        </div>

        {/* Reactive section*/}
        <ClubSection options={options ?? []} />
      </SectionLayout>
    </Suspense>
  );
}
