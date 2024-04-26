import { ChampionSkeleton } from "@/components/Champion/ChampionSkeleton";

export function ImageGridSkeleton() {
  const arr = Array.from({ length: 167 });

  return (
    <div className='grid grid-cols-4 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-13 2xl:grid-cols-15'>
      {arr.map((_, index) => (
        <ChampionSkeleton key={index} />
      ))}
    </div>
  );
}
