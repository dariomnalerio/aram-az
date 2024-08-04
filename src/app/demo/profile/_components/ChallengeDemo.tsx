"use client";
import { getUserPlayedChampsByClub } from "@/app/actions";
import { getChampImages } from "@/app/actions/images/get-champ-images";
import { Champion } from "@/components/Champion";
import { cn } from "@/lib/utils";
import { ChampImg, Mode, PlayedChamps } from "@/types";
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownFilter } from "@/app/user/[id]/_components/hasClub/DropdownFilter";
import { ImageGridSkeleton } from "@/app/user/[id]/_components/hasClub/ImageGridSkeleton";
import { DemoSaveBtn } from "./DemoSaveBtn";

export function ChallengeDemo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [imgs, setImgs] = useState<ChampImg[]>([]);
  const [filteredImgs, setFilteredImgs] = useState<ChampImg[]>([]);
  const [playedChamps, setPlayedChamps] = useState<PlayedChamps>(() => {
    const saved = localStorage.getItem("playedChamps");
    return saved ? JSON.parse(saved) : [];
  });
  const [initialPlayedChamps, setInitialPlayedChamps] = useState<PlayedChamps>(playedChamps);
  const hasPlayedAllChampions = playedChamps?.length === 168;
  const noChampionsPlayed = initialPlayedChamps?.length === 0;

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
          initialPlayedChamps?.some((champ) => champ.champion_id === champion.id) && nameMatches
        );
      }
      if (mode === "unplayed")
        return (
          !initialPlayedChamps?.some((champ) => champ.champion_id === champion.id) && nameMatches
        );
    });

    setFilteredImgs(filtered);
  }, [
    playedChamps,
    imgs,
    searchParams,
    pathname,
    router,
    initialPlayedChamps,
    createQueryString,
    getMode,
    getSearchQuery,
  ]);

  useEffect(() => {
    localStorage.setItem("playedChamps", JSON.stringify(playedChamps));
  }, [playedChamps]);

  const handleChampionClick = (champId: string) => {
    const isChampPlayed = playedChamps?.some((champ) => champ.champion_id === champId);

    if (isChampPlayed) {
      setPlayedChamps(playedChamps?.filter((champ) => champ.champion_id !== champId));
    } else {
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
      {!isLoadingImg && (
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
          <DemoSaveBtn
            className='w-full max-w-40 sm:ml-2 sm:block hidden'
            initialPlayedChamps={initialPlayedChamps}
            playedChamps={playedChamps}
            setInitialPlayedChamps={setInitialPlayedChamps}
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
            <DemoSaveBtn
              className='my-4 w-full max-w-40 sm:ml-2'
              initialPlayedChamps={initialPlayedChamps}
              playedChamps={playedChamps}
              setInitialPlayedChamps={setInitialPlayedChamps}
            />
          </div>
        </div>
      )}

      {isLoadingImg && <ImageGridSkeleton />}

      {/* 
          if query search returns no results
        */}
      {filteredImgs?.length === 0 && !isLoadingImg && getSearchQuery() && (
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
