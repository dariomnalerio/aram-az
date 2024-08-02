"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateClubDialog({
  userId,
  createClub,
}: {
  userId: string;
  createClub: (formData: FormData) => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Create Club</Button>
      </DialogTrigger>

      <DialogContent className='z-[999]'>
        <form action={createClub}>
          <DialogHeader>
            <DialogTitle>Create a new club</DialogTitle>
            <DialogDescription className='py-2'>
              Create a new club and invite your friends to join the challenge!
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col gap-4'>
            <div>
              <Label htmlFor='clubName'>Club Name</Label>
              <Input id='clubName' name='clubName' className='mt-1' />
            </div>
            <div>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' name='username' className='mt-1' />
            </div>
            <input id='userId' name='userId' type='hidden' value={userId} />
          </div>
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button type='submit' className='w-full'>
                Create new club
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
