"use client";
import { getChampImages } from "@/app/actions";
import RemoveSearchParamBtn from "@/app/clubs/_components/RemoveSearchParamBtn";
import { Champion } from "@/components/Champion";
import SectionLayout from "@/components/Layout/SectionLayout";
import { ChampImg, DemoMember } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  member: DemoMember;
};

export default function UserDataShowcaseDemo({ member }: Props) {
  const [imgs, setImgs] = useState<ChampImg[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data: imgs } = await getChampImages();
      setImgs(imgs);
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='flex justify-center items-center gap-6 mb-16'>
        <RemoveSearchParamBtn param='user' className='mt-1' />
        <h1 className='text-4xl text-center text-pretty'>{`Total champions played by ${member.username}`}</h1>
      </div>
      <ul className=' flex flex-wrap justify-center gap-1'>
        {imgs?.map((img) => (
          <li key={img.id}>
            <Champion
              key={img.id}
              url={img.img_url}
              name={img.name}
              className={member.champions.includes(img.id) ? "opacity-20" : ""}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
