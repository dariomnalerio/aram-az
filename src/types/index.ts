export type Option = {
  value: string;
  label: string;
};

export type Mode = "all" | "played" | "unplayed";

export type Club = {
  club_id: string;
  user_id: string;
  created_at: string;
  name?: string;
};

export type UserClub = {
  user_id: string;
  club_id: string;
  username?: string;
  created_at: string;
};

export type UserClubChamp = {
  user_id: string;
  club_id: string;
  champion_id: string;
  created_at: string;
};

export type ClubMemberWithChampions = {
  clubId: string;
  userId: string;
  username: string;
  champions: string[];
};

export type ChampImg = {
  id: string;
  img_url: string;
  name: string;
};

export type PlayedChamps =
  | {
      champion_id: any;
    }[]
  | null
  | undefined;

export type Options = {
  value: string;
  label: string;
};

export interface DemoMember {
  champions: string[];
  username: string;
  id: string;
}
