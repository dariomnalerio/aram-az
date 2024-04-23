import {
  addPlayedChampsToClub,
  getUserPlayedChampsByClub,
  removePlayedChampsFromClub,
} from "@/app/actions";
import { getChampImages } from "@/app/actions/images/get-champ-images";
import { Champion } from "@/components/Champion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChampImg, PlayedChamps } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SaveBtn } from "./SaveBtn";

type ChallengeSectionProps = {
  clubId: string;
};

export function ChallengeSection({ clubId }: ChallengeSectionProps) {
  const params = useParams<{ id: string }>();
  const [imgs, setImgs] = useState<ChampImg[]>([]);
  const [playedChamps, setPlayedChamps] = useState<PlayedChamps>([]);
  const initialPlayedChamps = useRef<PlayedChamps>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getUserPlayedChampsByClub({
        clubId,
        userId: params.id,
      });
      if (response) {
        setPlayedChamps(response.data);
        initialPlayedChamps.current = response.data;
      }
    };

    getData();
  }, [clubId, params.id]);

  useEffect(() => {
    if (imgs.length > 0) return;

    const getImages = async () => {
      const { data } = await getChampImages();
      if (data) {
        setImgs(data);
      }
    };

    getImages();
  }, [imgs]);

  const handleOnClick = (champId: string) => {
    // add to playedChamps
    const isChampPlayed = playedChamps?.some((champ) => champ.champion_id === champId);

    // remove from playedChamps
    if (isChampPlayed) {
      setPlayedChamps(playedChamps?.filter((champ) => champ.champion_id !== champId));
    } else {
      // add to playedChamps
      setPlayedChamps((prev) => {
        return prev ? [...prev, { champion_id: champId }] : [{ champion_id: champId }];
      });
    }
  };

  const handleSave = async () => {
    // TODO: improve handlign
    if (!playedChamps) return;

    // get champs to add
    const previouslyPlayedChamps = initialPlayedChamps.current ?? [];

    // get champs to add
    const champsToAdd = playedChamps?.filter(
      (champ) => !previouslyPlayedChamps.some((c) => c.champion_id === champ.champion_id)
    );

    // get champs to delete
    const champsToDelete = previouslyPlayedChamps?.filter(
      (champ) => !playedChamps.some((c) => c.champion_id === champ.champion_id)
    );

    // add champs to club
    if (champsToAdd.length > 0) {
      const response = await addPlayedChampsToClub({ clubId, userId: params.id, champsToAdd });
    }

    // remove champs from club
    if (champsToDelete.length > 0) {
      const response = await removePlayedChampsFromClub({
        clubId,
        userId: params.id,
        champsToDelete,
      });
    }
  };

  return (
    <>
      <SaveBtn handleSave={handleSave} className='my-4' />
      {imgs.length > 0 && (
        <div className='grid flex-grid gap-1.5 max-w-[288px] sm:max-w-[576px] md:max-w-[648px] lg:max-w-[720px] xl:max-w-[936px] 2xl:max-w-[1080px]'>
          {imgs.map((img) => (
            <Champion
              key={img.name}
              url={img.img_url}
              name={img.name}
              className={cn("transition hover:scale-110", {
                "opacity-20": playedChamps?.some((champ) => champ.champion_id === img.id),
              })}
              onClick={() => handleOnClick(img.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
