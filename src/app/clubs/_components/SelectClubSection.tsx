"use client";

import SelectClub from "@/components/Clubs/SelectClub";
import { Options } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SelectClubType = {
  options: Options[];
};
export function SelectClubSection({ options }: SelectClubType) {
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
    <>
      <SelectClub
        options={options}
        onChange={onChange}
        defaultValue={searchParams.get("club") && searchParams.get("club")}
      />
    </>
  );
}
