"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { getUserClub } from "./get-user-club";
import { getUserPlayedChampsByClub } from "./get-user-played-by-club";

type UserInfo = {
  champions: string[];
  user_id: string;
  club_id: string;
  username?: string;
  created_at: string;
};

type GetAllUserInfoFromClubResponse =
  | { error: PostgrestError; data?: undefined }
  | { data: UserInfo; error: null };

export async function getAllUserInfoFromclub({
  userId,
  clubId,
}: {
  userId: string;
  clubId: string;
}): Promise<GetAllUserInfoFromClubResponse> {
  const { data: userClubData, error: userClubDataError } = await getUserClub({
    userId,
    clubId,
  });

  if (userClubDataError) {
    return { error: userClubDataError };
  }

  const { data: playedChamps, error: playedChampsError } = await getUserPlayedChampsByClub({
    clubId,
    userId,
  });

  if (playedChampsError) {
    return { error: playedChampsError };
  }

  return {
    data: {
      ...userClubData,
      champions: playedChamps?.map((champ) => champ.champion_id),
    },
    error: null,
  };
}
