"use client";
import { Button } from "../ui/button";

export function GoBackButton() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Button onClick={goBack} size={"xl"} className='text-xl' variant={"outline"}>
      Go back
    </Button>
  );
}
