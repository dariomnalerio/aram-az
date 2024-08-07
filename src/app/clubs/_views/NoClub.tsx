import { getUser } from "@/app/actions";
import NoClubSection from "@/components/Clubs/NoClubSection";

type Props = {
  userId: string;
};

export async function NoClub({ userId }: Props) {
  return <NoClubSection userId={userId} />;
}
