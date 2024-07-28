import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mode } from "@/types";

type ChampionFilterProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export function DropdownFilter({ mode, setMode }: ChampionFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className='max-w-20'>
          Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='ml-14 bg-background'>
        <DropdownMenuRadioGroup value={mode} onValueChange={setMode as (value: string) => void}>
          <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='played'>Played</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='unplayed'>Unplayed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
