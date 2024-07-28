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
