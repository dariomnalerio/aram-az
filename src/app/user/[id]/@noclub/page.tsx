import NoClubSection from "@/components/Clubs/NoClubSection";

type Props = {
  params: {
    id: string;
  };
};
export default function NoClub({ params }: Props) {
  if (!params.id) return null;
  return <NoClubSection userId={params.id} />;
}
