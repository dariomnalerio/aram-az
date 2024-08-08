"use client";
import { getChampImagesByIds, getChampsCount } from "@/app/actions";
import { useEffect, useMemo, useState } from "react";
import { UserStats } from "@/app/clubs/_components/UserStats";
import { ChampImg, DemoMember } from "@/types";
import { Champion } from "@/components/Champion";
import ClubSkeleton from "@/app/clubs/_components/ClubSkeleton";
import { HasClub } from "../_components/HasClub";
import { useSearchParams } from "next/navigation";
import UserDataShowcaseDemo from "../_components/UserDataShowcaseDemo";

interface Champion {
  champion_id: string;
}

export default function ClubDemo() {
  const [playedChamps] = useState<Champion[] | null>(() => {
    const storedChamps = localStorage.getItem("playedChamps");
    return storedChamps ? (JSON.parse(storedChamps) as Champion[]) : null;
  });
  const [champCount, setChampCount] = useState<number | null>(null);
  const [imgs, setImgs] = useState<ChampImg[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const userFromLocalStorage = useMemo(
    () => ({
      champions: playedChamps?.map((champ) => champ.champion_id) ?? [],
      username: "User Demo",
      id: "0",
    }),
    [playedChamps]
  );

  const mockUsers: DemoMember[] = useMemo(
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

  const selectedUserId = searchParams.get("user");

  const selectedMember = useMemo(() => {
    return members.find((member) => member.id === selectedUserId) || userFromLocalStorage;
  }, [members, selectedUserId, userFromLocalStorage]);

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
    return <ClubSkeleton />;
  }

  return (
    <div className='container flex flex-col gap-4 mt-10'>
      {!selectedUserId &&
        sortedMembers.map((member) => (
          <HasClub key={member.id} member={member} champCount={champCount!} imgs={imgs!} />
        ))}
      {selectedUserId && <UserDataShowcaseDemo member={selectedMember} />}
    </div>
  );
}
