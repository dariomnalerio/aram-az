import { Button } from "@/components/ui/button";
import { PlayedChamps } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type SaveBtnProps = {
  className?: string;
  playedChamps: PlayedChamps;
  initialPlayedChamps: PlayedChamps;
  setInitialPlayedChamps: Dispatch<SetStateAction<PlayedChamps>>;
};

export function DemoSaveBtn({
  className,
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

    if (champsToAdd.length === 0 && champsToDelete.length === 0) {
      toast("No changes to save");
      return;
    }

    // Save the updated played champions to localStorage
    localStorage.setItem("playedChamps", JSON.stringify(playedChamps));

    // Update the initial played champions state
    setInitialPlayedChamps(playedChamps);

    // Notify the user about the successful save
    toast.success("Changes saved");
  };

  return (
    <Button className={className} onClick={handleSave}>
      Save
    </Button>
  );
}
