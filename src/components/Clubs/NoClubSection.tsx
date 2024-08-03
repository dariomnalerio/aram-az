import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClub } from "@/app/actions/clubs/create-club";
import { CreateClubDialog } from "./CreateClubDialog";
import { joinClub } from "@/app/actions";

type Props = {
  userId: string;
};

export default function NoClubSection({ userId }: Props) {
  return (
    <section className='flex-1 flex flex-col gap-3 items-center justify-center pb-20 px-2.5 md:px-0'>
      <h2 className='text-4xl font-semibold pb-7 text-center text-balance'>
        You are not part of any clubs
      </h2>

      <CreateClubDialog userId={userId} createClub={createClub} />

      <p className='text-lg font-medium mt-5'>You can also join a club with an invitation link</p>
    </section>
  );
}
