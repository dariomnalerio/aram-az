import { getUser } from "@/app/actions";
import { Unauthorized } from "@/components/Misc/Unauthorized";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user && user.id !== params.id) {
    return <Unauthorized />;
  }

  return (
    <div className='flex-1 flex justify-center'>
      <h1>User {params.id}</h1>
    </div>
  );
}
