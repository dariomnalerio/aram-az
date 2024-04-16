import Image from "next/image";
import aram from "@/assets/landing/aram.webp";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mx-1.5 mt-20 flex justify-center'>
        <div className='relative aspect-video max-w-[1200px]'>
          <Image src={aram} alt='ARAM-AZ' className='w-full rounded-xl shadow-xl' />
          <div className='absolute bottom-40 left-7'>
            <h2 className='font-semiboldb text-lg md:text-3xl'>ARAM-AZ challenge!</h2>
            <p className='mt-1 w-1/2  text-indigo-100'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste earum eligendi laborum
              doloribus laboriosam excepturi perferendis eos voluptates commodi!
            </p>

            <Button className='mt-5' asChild>
              <Link href={`/login`}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
