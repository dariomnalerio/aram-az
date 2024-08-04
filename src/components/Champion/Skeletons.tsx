import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
type SkeletonProps = {
  className?: string;
};
export function InputSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn("w-full max-w-sm h-9", className)}></Skeleton>;
}

export function DropdownFilterSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn("w-16 h-9 rounded-md", className)}></Skeleton>;
}

export function SaveBtnSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn("w-full max-w-40 h-9 rounded-md", className)}></Skeleton>;
}
