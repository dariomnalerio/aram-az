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
    <div>
      <div className='flex flex-col items-center sm:items-start sm:flex-row gap-4 pt-6'>
        <h2 className='text-2xl font-medium'>Select a Club</h2>
        <SelectClub options={options} onChange={onChange} />
      </div>
      <ChallengeSection clubId={value} />
    </div>
  );
}
