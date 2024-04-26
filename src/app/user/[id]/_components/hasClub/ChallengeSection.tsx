import { getUserPlayedChampsByClub } from "@/app/actions";
import { getChampImages } from "@/app/actions/images/get-champ-images";
import { Champion } from "@/components/Champion";
import { cn } from "@/lib/utils";
import { ChampImg, Mode, PlayedChamps } from "@/types/types";
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SaveBtn } from "./SaveBtn";
import { DropdownFilter } from "./DropdownFilter";
import { Input } from "@/components/ui/input";
import { ImageGridSkeleton } from "./ImageGridSkeleton";

type ChallengeSectionProps = {
  clubId: string;
};

export function ChallengeSection({ clubId }: ChallengeSectionProps) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [imgs, setImgs] = useState<ChampImg[]>([]);
  const [filteredImgs, setFilteredImgs] = useState<ChampImg[]>([]);
  const [playedChamps, setPlayedChamps] = useState<PlayedChamps>([]);
  const initialPlayedChamps = useRef<PlayedChamps>([]);

  const hasPlayedAllChampions = playedChamps?.length === 167;
  const noChampionsPlayed = playedChamps?.length === 0;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const getMode = useCallback(() => {
    let mode: Mode = "all";

    const modeParam = searchParams.get("mode") as Mode;

    if (modeParam === "played" || modeParam === "unplayed") {
      mode = modeParam;
    }

    return mode;
  }, [searchParams]);

  const getSearchQuery = useCallback(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

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
      setIsLoadingImg(true);
      const { data } = await getChampImages();
      if (data) {
        setImgs(data);
      }
      setIsLoadingImg(false);
    };

    getImages();
  }, [imgs]);

  useEffect(() => {
    if (!imgs) return;

    const filtered = imgs.filter((champion) => {
      const searchQuery = getSearchQuery();
      const mode = getMode();

      const nameMatches = champion.name
        .toLocaleLowerCase()
        .replace(".webp", "")
        .includes(searchQuery);

      if (mode === "all") return nameMatches;

      if (mode === "played") {
        return (
          initialPlayedChamps.current?.some((champ) => champ.champion_id === champion.id) &&
          nameMatches
        );
      }
      if (mode === "unplayed")
        return (
          !initialPlayedChamps.current?.some((champ) => champ.champion_id === champion.id) &&
          nameMatches
        );
    });

    setFilteredImgs(filtered);
  }, [
    playedChamps,
    imgs,
    searchParams,
    pathname,
    router,
    createQueryString,
    getMode,
    getSearchQuery,
  ]);

  // on leave page
  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (JSON.stringify(initialPlayedChamps.current) !== JSON.stringify(playedChamps)) {
        e.preventDefault();
      }
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [playedChamps]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchQuery = e.target.value.toLocaleLowerCase().replace(" ", "");

    const searchParam = getSearchQuery();
    // if search query is empty, remove search query from url
    if (!searchQuery && searchParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    router.push(`${pathname}?${createQueryString("search", searchQuery)}`);
  };

  const handleFilterChange = (mode: Mode) => {
    router.push(`${pathname}?${createQueryString("mode", mode)}`);
  };

  return (
    <>
      <div className='sm:flex sm:justify-between sm:items-center'>
        <div className='hidden sm:flex flex-1 items-center gap-2 my-4'>
          <Input
            type='text'
            placeholder='Search'
            className='w-full max-w-sm'
            onChange={handleSearch}
          />
          <DropdownFilter mode={getMode()} setMode={handleFilterChange} />
        </div>
        <SaveBtn
          className='w-full max-w-40 sm:ml-2 sm:block hidden'
          initialPlayedChamps={initialPlayedChamps}
          clubId={clubId}
          userId={params.id}
          playedChamps={playedChamps}
        />
        <div className='flex flex-col justify-center items-center sm:hidden mt-4 mb-2'>
          <div className='flex gap-1.5'>
            <Input
              type='text'
              placeholder='Search'
              className='w-full max-w-sm'
              onChange={handleSearch}
            />
            <DropdownFilter mode={getMode()} setMode={handleFilterChange} />
          </div>
          <SaveBtn
            className='my-4 w-full max-w-40 sm:ml-2'
            initialPlayedChamps={initialPlayedChamps}
            clubId={clubId}
            userId={params.id}
            playedChamps={playedChamps}
          />
        </div>
      </div>

      {isLoadingImg && <ImageGridSkeleton />}

      {/* 
          if query search returns no results
        */}
      {filteredImgs?.length === 0 && !isLoadingImg && getSearchQuery() && !noChampionsPlayed && (
        <h3 className='text-center text-foreground text-3xl py-3'>No champions found</h3>
      )}

      {/* if no champs have been played */}
      {getMode() === "played" && noChampionsPlayed && (
        <div className='text-center text-foreground text-3xl py-3'>
          You have not played any champions
        </div>
      )}

      {/* 
            if user has played all champions and mode is 'unplayed'
        */}
      {getMode() === "unplayed" && hasPlayedAllChampions && (
        <div className='text-center text-foreground text-3xl py-3'>
          You have played all the champions
        </div>
      )}

      {filteredImgs.length > 0 && (
        <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-13 2xl:grid-cols-15 gap-1.5 pb-5'>
          {filteredImgs.map((img) => (
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
