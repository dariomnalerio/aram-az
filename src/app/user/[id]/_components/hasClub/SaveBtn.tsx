import { addPlayedChampsToClub, removePlayedChampsFromClub } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { PlayedChamps } from "@/types";
import { revalidatePath } from "next/cache";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { toast } from "sonner";

type SaveBtnProps = {
  className?: string;
  clubId: string;
  userId: string;
  playedChamps: PlayedChamps;
  initialPlayedChamps: PlayedChamps;
  setInitialPlayedChamps: Dispatch<SetStateAction<PlayedChamps>>;
};

export function SaveBtn({
  className,
  clubId,
  userId,
  playedChamps,
  initialPlayedChamps,
  setInitialPlayedChamps,
}: SaveBtnProps) {
  const handleSave = async () => {
    if (!playedChamps) return;

    const previouslyPlayedChamps = initialPlayedChamps ?? [];

    const champsToAdd = playedChamps?.filter(
      (champ) => !previouslyPlayedChamps.some((c) => c.champion_id === champ.champion_id)
    );

    const champsToDelete = previouslyPlayedChamps?.filter(
      (champ) => !playedChamps.some((c) => c.champion_id === champ.champion_id)
    );

    const promises = [];

    if (champsToAdd.length > 0) {
      promises.push(addPlayedChampsToClub({ clubId, userId, champsToAdd }));
    }

    if (champsToDelete.length > 0) {
      promises.push(removePlayedChampsFromClub({ clubId, userId, champsToDelete }));
    }

    if (promises.length === 0) {
      toast("No changes to save");
    } else {
      const responses = await Promise.all(promises);
      const hasError = responses.some((response) => response.error);

      if (hasError) {
        toast.error("Error saving changes");
      } else {
        toast.success("Changes saved");
        setInitialPlayedChamps(playedChamps);
      }
    }
  };

  return (
    <Button className={className} onClick={handleSave}>
      Save
    </Button>
  );
}
