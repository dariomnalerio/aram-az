import { Skeleton } from "@/components/ui/skeleton";

export default function ClubSkeleton() {
  return (
    <div className='container flex flex-col gap-4'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='flex flex-col sm:flex-row items-center gap-4 border bg-primary/10 p-4 rounded-lg shadow-lg w-full'
        >
          <div className='flex flex-col gap-1 items-start sm:items-center justify-around p-2 rounded-md min-h-[90px]'>
            <Skeleton className='w-16 h-4 rounded-md bg-primary/50 self-center' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-32 h-4' />
              <Skeleton className='w-32 h-4' />
            </div>
          </div>

          {/* Latest played champs */}
          <div className='w-full'>
            <ul className='flex gap-1 flex-wrap justify-center sm:justify-normal'>
              {Array.from({ length: 16 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className='w-16 h-16' />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
