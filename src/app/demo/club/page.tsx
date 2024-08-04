"use client";
import { getChampImagesByIds, getChampsCount } from "@/app/actions";
import { useEffect, useMemo, useState } from "react";
import { UserPictureDemo } from "../_components/UserPictureDemo";
import { UserStats } from "@/app/clubs/_components/UserStats";
import { ChampImg } from "@/types";
import { Champion } from "@/components/Champion";
import { Skeleton } from "@/components/ui/skeleton";

interface Champion {
  champion_id: string;
}

interface Member {
  champions: string[];
  username: string;
  id?: string;
}
export default function ClubDemo() {
  const [playedChamps] = useState<Champion[] | null>(() => {
    const storedChamps = localStorage.getItem("playedChamps");
    return storedChamps ? (JSON.parse(storedChamps) as Champion[]) : null;
  });
  const [champCount, setChampCount] = useState<number | null>(null);
  const [imgs, setImgs] = useState<ChampImg[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userFromLocalStorage = useMemo(
    () => ({
      champions: playedChamps?.map((champ) => champ.champion_id) ?? [],
      username: "Demo User",
      id: "0",
    }),
    [playedChamps]
  );

  const mockUsers: Member[] = useMemo(
    () => [
      {
        champions: [
          "f4fd3908-eee2-4bde-b34e-95ac5a71560c",
          "34b1e284-6d3d-4cb6-a470-4b77798d425a",
          "405447ca-8698-4f15-9812-a66bb15af96b",
          "8067a670-2d64-42a2-a932-53df139d7205",
          "a8dc5811-63ec-4bc8-85e3-48ff2a11ae87",
        ],
        username: "One",
        id: "1",
      },
      {
        champions: [
          "ecb74893-5516-4903-8873-d1e2674db729",
          "773fd14a-b087-403d-9d18-91b2d49a827b",
          "6d54edfb-9956-44b8-b5d4-1e390b120765",
          "91b2e511-5d8e-4fb7-b216-ff67d3174cdc",
        ],
        username: "Two",
        id: "2",
      },
      {
        champions: [
          "dbc5c3b4-b833-4770-aae2-bf8b5edf6730",
          "ecb74893-5516-4903-8873-d1e2674db729",
          "463c8f79-e3e2-4976-b571-34717517c71f",
        ],
        username: "Three",
        id: "3",
      },
      {
        champions: [],
        username: "Four",
        id: "4",
      },
    ],
    []
  );

  const members = useMemo(
    () => [userFromLocalStorage, ...mockUsers],
    [mockUsers, userFromLocalStorage]
  );

  useEffect(() => {
    const fetchData = async () => {
      const allChampionIds = members.flatMap((member) => member.champions);
      const uniqueChampionIds = Array.from(new Set(allChampionIds));

      if (uniqueChampionIds.length > 0) {
        const { data } = await getChampImagesByIds(uniqueChampionIds);
        if (data) {
          setImgs(data);
        }
      }

      const count = await getChampsCount();
      if (count) {
        setChampCount(count);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [members]);

  const sortedMembers = members
    .map((member) => {
      const completedChamps = member.champions.length;
      const completionRate = (completedChamps / champCount!) * 100;
      return {
        ...member,
        completionRate,
      };
    })
    .sort((a, b) => b.completionRate - a.completionRate);

  if (isLoading) {
    return (
      <div className='container flex flex-col gap-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='flex flex-col sm:flex-row items-center gap-4 border bg-primary/10 p-4 rounded-lg shadow-lg w-full'
          >
            <div className='flex flex-col gap-1 items-start sm:items-center justify-around p-2 rounded-md min-h-[90px]'>
              <Skeleton className='w-16 h-4 rounded-md bg-primary/50 self-center' />
              <div className='flex flex-col gap-1'>
                <Skeleton className='w-32 h-4' />
                <Skeleton className='w-32 h-4' />
              </div>
            </div>

            {/* Latest played champs */}
            <div className='w-full'>
              <ul className='flex gap-1 flex-wrap justify-center sm:justify-normal'>
                {Array.from({ length: 16 }).map((_, i) => (
                  <li key={i}>
                    <Skeleton className='w-16 h-16' />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='container flex flex-col gap-4 mb-20'>
      {sortedMembers.map((member) => (
        <div
          key={member.id}
          className='flex flex-col sm:flex-row items-center gap-4 border bg-primary/10 p-4 rounded-lg shadow-lg w-full'
        >
          <div className='flex flex-col gap-1 items-start sm:items-center justify-around p-2 rounded-md'>
            <UserPictureDemo username={member.username} />
            <UserStats member={member} champCount={champCount!} />
          </div>

          {/* Latest played champs */}
          <div className='w-full'>
            <ul className='flex gap-1 flex-wrap justify-center sm:justify-normal'>
              {member.champions.length > 0 &&
                member.champions.slice(0, 17).map((champ) => (
                  <li key={champ}>
                    <Champion
                      key={champ}
                      url={imgs?.find((img) => img.id === champ)?.img_url ?? ""}
                      name={champ}
                    />
                  </li>
                ))}

              {member.champions.length === 0 && (
                <li className='text-lg text-pretty text-center w-full'>
                  <span className='text-primary/80 font-medium'>{member.username}</span> has not
                  played any champions yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
