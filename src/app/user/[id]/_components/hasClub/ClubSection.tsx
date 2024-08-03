"use client";
import { useState, useEffect, useCallback } from "react";
import { ChallengeSection } from "./ChallengeSection";
import SelectClub from "@/components/Clubs/SelectClub";
import { Options } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type ClubSectionType = {
  options: Options[];
};

export function ClubSection({ options }: ClubSectionType) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const router = useRouter();
  const onChange = (newValue: string) => {
    setValue(newValue);
    const newQueryString = createQueryString("club", newValue);
    router.replace(`?${newQueryString}`);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const club = searchParams.get("club");
    if (club) {
      setValue(club);
    } else {
      const defaultClub = options[0].value;
      setValue(defaultClub);
      const newQueryString = createQueryString("club", defaultClub);
      router.replace(`?${newQueryString}`);
    }
  }, [value, options, searchParams, createQueryString, router]);

  return (
    <div className='w-full max-w-[288px] sm:max-w-[576px] md:max-w-[648px] lg:max-w-[720px] xl:max-w-[936px] 2xl:max-w-[1080px] flex flex-col'>
      <div className='flex justify-between'>
        <SelectClub
          options={options}
          onChange={onChange}
          defaultValue={searchParams.get("club") && searchParams.get("club")}
        />
      </div>
      <ChallengeSection clubId={value} />
    </div>
  );
}
