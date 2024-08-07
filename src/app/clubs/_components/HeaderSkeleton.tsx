import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <section className='flex flex-col items-center mx-4'>
      <div className='flex justify-center gap-10 pt-10 pb-16'>
        <h1 className=' text-3xl sm:text-4xl text-center font-semibold'>Explore Your Clubs</h1>
      </div>
      <div className='container'>
        <div className='flex gap-6 md:gap-2 items-center justify-center md:justify-between flex-wrap'>
          <div className='flex flex-wrap justify-center items-center gap-2'>
            <Skeleton className='w-[180px] h-9 rounded-md' />
            <Skeleton className='w-[120px] h-6 rounded-md' />
          </div>
          <div className='flex gap-2'>
            <Skeleton className='w-[135px] h-10 rounded-md' />
            <Skeleton className='w-[135px] h-10 rounded-md' />
          </div>
        </div>
      </div>
    </section>
  );
}
