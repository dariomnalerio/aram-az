import logo from "@/assets/logo.svg";
import Image from "next/image";
import ProviderButton from "./_components/ProviderButton";
import { handleDiscordLogin, handleGoogleLogin } from "../actions";

export default async function page() {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='mb-5 flex flex-col items-center gap-3'>
        <div className=' flex items-center justify-center gap-2'>
          <Image src={logo} alt='ARAM-AZ Logo' className='h-6 w-6' />
          <h2 className='text-bold text-4xl'>ARAM-AZ</h2>
        </div>
        <p className='text-xl font-medium text-blue-200'>Please sign in to continue.</p>
      </div>
      <ProviderButton provider='discord' handleLogin={handleDiscordLogin} />
      <ProviderButton provider='google' handleLogin={handleGoogleLogin} />
    </div>
  );
}
