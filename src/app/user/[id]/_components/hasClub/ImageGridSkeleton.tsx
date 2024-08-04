import { InputSkeleton, DropdownFilterSkeleton, SaveBtnSkeleton } from "@/components/Champion";
import { ChampionSkeleton } from "@/components/Champion/ChampionSkeleton";

export function ImageGridSkeleton() {
  const arr = Array.from({ length: 167 });

  return (
    <div>
      {/* Desktop Skeleton */}
      <div className='hidden sm:flex sm:justify-between sm:items-center'>
        <div className='sm:flex flex-1 items-center gap-2 my-4'>
          <InputSkeleton />
          <DropdownFilterSkeleton />
        </div>
        <SaveBtnSkeleton />
      </div>

      {/* Mobile Skeleton */}
      <div className='flex flex-col justify-center items-center sm:hidden mt-4 mb-2'>
        <div className='flex gap-1.5 w-full'>
          <InputSkeleton className='w-full max-w-sm' />
          <DropdownFilterSkeleton className='max-w-20' />
        </div>
        <SaveBtnSkeleton className='my-4 w-full max-w-40 sm:ml-2' />
      </div>

      {/* Image Grid Skeleton */}
      <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-13 2xl:grid-cols-15'>
        {arr.map((_, index) => (
          <ChampionSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
