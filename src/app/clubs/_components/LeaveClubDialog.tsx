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
import { useSearchParams } from "next/navigation";

type LeaveClubDialogProps = {
  userId: string;
  leaveClub: (formData: FormData) => Promise<void>;
};

export function LeaveClubDialog({ userId, leaveClub }: LeaveClubDialogProps) {
  const searchParams = useSearchParams();
  const clubId = searchParams.get("club");

  if (!clubId)
    return (
      <Button variant={"destructive"} size={"lg"}>
        Leave Club
      </Button>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size={"lg"}>
          Leave Club
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={leaveClub}>
          <DialogHeader>
            <DialogTitle>Are you sure you want to leave this club?</DialogTitle>
            <DialogDescription className='pt-2 pb-6'>
              You will lose access to all club features and data.
              <input type='hidden' name='userId' value={userId} />
              <input type='hidden' name='clubId' value={clubId} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=''>
            <DialogClose asChild>
              <Button variant={"destructive"} type='submit' className='w-full'>
                Leave Club
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
