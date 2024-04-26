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
import { toast } from "sonner";

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

  const handleChampionClick = (champId: string) => {
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

  return (
    <>
      <SaveBtn
        className='my-4 w-full max-w-40'
        initialPlayedChamps={initialPlayedChamps}
        clubId={clubId}
        userId={params.id}
        playedChamps={playedChamps}
      />
      {imgs.length > 0 && (
        <div className='grid flex-grid gap-1.5 max-w-[288px] sm:max-w-[576px] md:max-w-[648px] lg:max-w-[720px] xl:max-w-[936px] 2xl:max-w-[1080px] pb-5'>
          {imgs.map((img) => (
            <Champion
              key={img.name}
              url={img.img_url}
              name={img.name}
              className={cn("transition hover:scale-110", {
                "opacity-20": playedChamps?.some((champ) => champ.champion_id === img.id),
              })}
              onClick={() => handleChampionClick(img.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
