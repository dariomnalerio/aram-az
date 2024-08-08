"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  param: string;
  className?: string;
};
export default function RemoveSearchParamBtn({ param, className }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button onClick={handleClick} className={className} size={"sm"} variant={"outline"}>
      <Undo2 size={16} />
    </Button>
  );
}
