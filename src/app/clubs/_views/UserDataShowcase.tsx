import { getChampImages } from "@/app/actions";
import { getAllUserInfoFromclub } from "@/app/actions/clubs/get-all-user-info-from-club";
import { Champion } from "@/components/Champion";
import SectionLayout from "@/components/Layout/SectionLayout";
import RemoveSearchParamBtn from "../_components/RemoveSearchParamBtn";

type Props = {
  clubId: string;
  userId: string;
};

export default async function UserDataShowcase({ userId, clubId }: Props) {
  const { data: userData } = await getAllUserInfoFromclub({ clubId, userId });

  const { data: imgs } = await getChampImages();

  //TODO: Add error handling

  return (
    <SectionLayout>
      <div className='container'>
        <div className='flex justify-center items-center gap-6 mb-16'>
          <RemoveSearchParamBtn param='user' className='mt-1' />
          <h1 className='text-4xl'>{`Total champions played by ${userData?.username}`}</h1>
        </div>
        <ul className=' flex flex-wrap justify-center gap-1'>
          {imgs?.map((img) => (
            <li key={img.id}>
              <Champion
                key={img.id}
                url={img.img_url}
                name={img.name}
                className={userData?.champions.includes(img.id) ? "opacity-20" : ""}
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}
