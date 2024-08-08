import Image from "next/image";
import profileView from "@/assets/landing/user-profile.webp";
import clubView from "@/assets/landing/club-view.webp";
import aram from "@/assets/landing/background.webp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveDownIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Feature } from "@/components/Landing/Feature";
import Testimonial from "@/components/Landing/Testimonial";

export default function Home() {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section
        className=' flex flex-col justify-center items-center text-center bg-cover bg-center h-dvh'
        style={{
          backgroundImage: `url(${aram.src})`,
        }}
      >
        <div className='relative z-10 max-w-4xl mx-auto px-4 py-16'>
          <h1 className='text-4xl sm:text-6xl md:text-7xl text-white text-pretty font-bold mb-6'>
            ARAM-AZ CHALLENGE
          </h1>
          <p className='text-lg sm:text-xl md:text-2xl brightness-200 font-medium text-pretty mb-8'>
            Compete with your friends to see who can claim the victory!
          </p>

          <Button asChild size={"lg"} className='text-white rounded-full text-lg font-medium'>
            <Link href='/demo/profile'>Try the Demo</Link>
          </Button>
        </div>

        <MoveDownIcon strokeWidth={3} size={48} className='animate-bounce mt-16' />
      </section>

      {/* Features Section */}
      <section className='py-16 bg-gray-200'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <Feature
              title='Update Your Club Stats'
              description='Update champions played in each club you are part of'
              image={profileView}
              alt='Feature 1'
            />

            <Feature
              title='Compete With Friends'
              description='Challenge your friends to see who can claim the victory'
              image={clubView}
              alt='Feature 2'
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-gray-800 text-white'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-12'>What Our Users Say</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            <Testimonial
              text='This platform is amazing! I love being able to track my progress and play with my friends.'
              user='Franco'
            />
            <Testimonial
              text="The UI is so clean and easy to use. I can't wait to see what new features are added."
              user='Exe'
            />
            <Testimonial
              text="I've been looking for a platform like this for a long time. It's perfect
                for my group of friends."
              user='Rocco'
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-16 bg-primary/80 text-white text-center'>
        <div className='max-w-4xl mx-auto px-4'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-8'>Ready to Join?</h2>
          <p className='text-lg sm:text-xl md:text-2xl mb-8'>
            Sign up now and start your journey with us!
          </p>
          <Button
            asChild
            size={"lg"}
            className='bg-white text-primary px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-gray-200 transition duration-300'
          >
            <Link href='/login'>Sign Up</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-6 bg-gray-900 text-white text-center flex justify-center gap-2 items-center'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} dariomnalerio. Some rights reserved.{" "}
        </p>
        <Link href='https://github.com/dariomnalerio' target='_blank'>
          <GitHubLogoIcon className='hover:scale-110 transition duration-300' />
        </Link>
      </footer>
    </div>
  );
}
