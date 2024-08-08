import { ImageGridSkeleton } from "../_components/hasClub/ImageGridSkeleton";

export default function Loading() {
  return (
    <>
      <section className='flex flex-1 items-center flex-col pt-16'>
        <div className='flex flex-col'>
          <h1 className='mb-4 text-3xl sm:text-4xl text-center font-semibold'>
            Champion Challenge
          </h1>
        </div>

        <ImageGridSkeleton />
      </section>
    </>
  );
}
