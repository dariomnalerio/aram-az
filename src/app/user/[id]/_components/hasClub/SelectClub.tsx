import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Options = {
  value: string;
  label: string;
};

type SelectClubType = {
  onChange: (value: string) => void;
  options: Options[];
};

export default function SelectClub({ onChange, options }: SelectClubType) {
  return (
    <Select onValueChange={onChange} defaultValue={options[0].value}>
      <SelectTrigger className='w-[180px]  self-center sm:self-start'>
        <SelectValue placeholder='Select Club' />
      </SelectTrigger>
      <SelectContent className='bg-background'>
        <SelectGroup>
          <SelectLabel>Clubs</SelectLabel>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
