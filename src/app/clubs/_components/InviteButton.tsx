"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function InviteButton() {
  const searcParams = useSearchParams();

  const clubId = searcParams.get("club");

  const handleCopyInviteLink = () => {
    const inviteLink = `localhost:3000/join?club=${clubId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        toast.success("Invite link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy invite link:", error);
      });
  };

  return (
    <Button variant={"link"} className='text-lg' onClick={handleCopyInviteLink}>
      Copy invite
    </Button>
  );
}
