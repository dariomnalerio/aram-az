import Image from "next/image";
import aram from "@/assets/landing/aram.webp";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className='mt-20 flex justify-center items-center'>
      <div className='relative md:aspect-video max-w-[1200px] px-2'>
        <Image
          src={aram}
          alt='ARAM-AZ'
          className='w-full rounded-xl shadow-xl md:visible invisible'
        />
        <div className='absolute flex flex-col gap-6 lg:gap-10 items-center top-0 h-full place-content-center'>
          <h1 className='font-bold text-3xl md:text-5xl text-black/80 text-center'>
            ARAM-AZ challenge!
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
