"use server";
import { ClubMemberWithChampions, UserClub, UserClubChamp } from "@/types";
import { getAllUsersFromClub } from "./get-all-users-from-club";
import { getAllChampsFromClub } from "./get-all-champs-from-club";

type Props = {
  clubId: string;
  userId: string;
};

export async function getAllClubInfo({
  clubId,
  userId,
}: Props): Promise<{ data: ClubMemberWithChampions[] | null; error: string | null }> {
  if (!userId) {
    return { data: null, error: "Missing user id" };
  }

  if (!clubId) {
    return { data: null, error: "Missing club id" };
  }

  const championsResponse = await getAllChampsFromClub(clubId);
  if (!championsResponse.data) {
    return { data: null, error: championsResponse.error.message };
  }
  const membersResponse = await getAllUsersFromClub(clubId);

  if (!membersResponse.data) {
    return { data: null, error: membersResponse.error.message };
  }

  const clubMembers = membersResponse.data.map((member: UserClub) => {
    const memberChamps = championsResponse.data
      .sort((a, b) => b.created_at.localeCompare(a.created_at)) // sort by most recent
      .filter((champ: UserClubChamp) => champ.user_id === member.user_id)
      .map((champ) => champ.champion_id);
    return {
      clubId: member.club_id,
      userId: member.user_id,
      username: member.username ?? "Unknown",
      champions: memberChamps,
    };
  });

  return { data: clubMembers, error: null };
}
