import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};
export default function DemoLayout({ children }: Props) {
  return (
    <div className='flex-1 flex flex-col items-center gap-4 mt-16'>
      <h1 className='text-5xl font-bold mb-5 text-center text-balance mx-1'>Aram-AZ Demo</h1>
      <h2 className='text-4xl text-center text-balance font-semibold mb-3'>
        Choose a section to view
      </h2>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href={"/demo/profile"}>Profile</Link>
        </Button>
        <Button asChild>
          <Link href={"/demo/club"}>Club View</Link>
        </Button>
      </div>

      {children}
    </div>
  );
}
