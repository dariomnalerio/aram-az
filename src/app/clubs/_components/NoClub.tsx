import { getUser } from "@/app/actions";
import NoClubSection from "@/components/Clubs/NoClubSection";

export default async function NoClub() {
  const { user } = await getUser();
  if (!user) {
    return null;
  }

  return <NoClubSection userId={user.id} />;
}
