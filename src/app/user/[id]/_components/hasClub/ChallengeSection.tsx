import { getUserPlayedChampsByClub } from "@/app/actions";
import { getChampImages } from "@/app/actions/images/get-champ-images";
import { ChampImg } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ChallengeSectionProps = {
  clubId: string;
};

export function ChallengeSection({ clubId }: ChallengeSectionProps) {
  const params = useParams<{ id: string }>();
  const [imgs, setImgs] = useState<ChampImg[]>([]);
  const [playedChamps, setPlayedChamps] = useState<
    | {
        champion_id: any;
      }[]
    | null
    | undefined
  >([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getUserPlayedChampsByClub({
        clubId,
        userId: params.id,
      });
      if (response) {
        setPlayedChamps(response.data);
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

  return (
    <>
      {imgs.length > 0 && (
        <div className='flex flex-wrap'>
          {imgs.map((img) => (
            <div key={img.id}>
              <Image src={img.img_url} alt={img.name} width={64} height={64} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
