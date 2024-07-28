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
            <DialogDescription>
              Create a new club and invite your friends to join the challenge!
            </DialogDescription>
          </DialogHeader>

          <div>
            <Label htmlFor='clubName'>Name</Label>
            <Input id='clubName' name='clubName' />
            <input id='userId' name='userId' type='hidden' value={userId} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit'>Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
