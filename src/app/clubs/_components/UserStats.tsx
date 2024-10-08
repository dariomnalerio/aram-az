import { Progress } from "@/components/ui/progress";

type Props = {
  member: {
    champions: string[];
  };
  champCount: number;
};
export function UserStats({ member, champCount }: Props) {
  const completedPercentage = (member.champions.length / champCount) * 100;
  return (
    <>
      <div className='flex justify-evenly gap-2 text-sm mb-1 my-2'>
        <span>
          {member.champions.length}/{champCount}
        </span>
        <span>{Math.round((member.champions.length / champCount!) * 100)}%</span>
      </div>
      <Progress value={completedPercentage} max={100} />
    </>
  );
}
