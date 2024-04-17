import { Input } from "@/components/ui/input";
import { CreateClubDialog } from "../_components/noClub/CreateClubDialog";
import { Button } from "@/components/ui/button";
import { createClub } from "@/app/actions/clubs/create-club";

type Props = {
  params: {
    id: string;
  };
};
export default function Page({ params }: Props) {
  return (
    <section className='flex-1 flex flex-col gap-3 items-center justify-center pb-20 px-2.5 md:px-0'>
      <h2 className='text-4xl font-semibold pb-7 text-center text-balance'>
        You are not part of any clubs
      </h2>

      <CreateClubDialog userId={params.id} createClub={createClub} />
      <span>or join one</span>
      <div className='flex gap-2'>
        <Input placeholder='Club code' className='border-secondary' />
        <Button>Join</Button>
      </div>
    </section>
  );
}
