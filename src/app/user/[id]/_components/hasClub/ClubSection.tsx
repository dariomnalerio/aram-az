"use client";
import { useState, useEffect } from "react";
import SelectClub from "./SelectClub";
import { ChallengeSection } from "./ChallengeSection";

type Options = {
  value: string;
  label: string;
};

type ClubSectionType = {
  options: Options[];
};

export function ClubSection({ options }: ClubSectionType) {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (options && options.length > 0) {
      setValue(options[0].value);
    }
  }, [options]);

  return (
    <div className='w-full max-w-[288px] sm:max-w-[576px] md:max-w-[648px] lg:max-w-[720px] xl:max-w-[936px] 2xl:max-w-[1080px] flex flex-col'>
      <SelectClub options={options} onChange={onChange} />
      <ChallengeSection clubId={value} />
    </div>
  );
}
