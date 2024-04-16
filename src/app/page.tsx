import Image from "next/image";
import aram from "@/assets/landing/aram.webp";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className='flex-1 flex justify-center md:items-center mt-20 md:mt-0 md:px-10 px-1'>
      <div className='relative md:aspect-video max-w-[1200px]'>
        <Image
          src={aram}
          alt='ARAM-AZ'
          className='w-full rounded-xl shadow-xl md:visible invisible'
        />
        <div className='absolute flex flex-col gap-6 lg:gap-10 items-center top-0 md:h-full md:place-content-center px-2'>
          <h1 className='font-bold text-3xl md:text-5xl text-black/80 text-center'>
            ARAM-AZ Challenge!
          </h1>
          <p className='font-medium  text-lime-300 text-center text-balance'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste earum eligendi laborum
            doloribus laboriosam excepturi perferendis eos voluptates commodi!
          </p>

          <Button asChild className='max-w-[10rem] w-full'>
            <Link href={`/login`}>Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
