import { Button } from "@/components/ui/button";

type SaveBtnProps = {
  handleSave: () => void;
  className?: string;
};

export function SaveBtn({ handleSave, className }: SaveBtnProps) {
  return (
    <Button className={className} onClick={handleSave}>
      Save
    </Button>
  );
}
