import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function SectionLayout({ children, className }: Props) {
  return (
    <section className={cn("flex flex-1 items-center flex-col pt-16 mb-20", className)}>
      {children}
    </section>
  );
}
