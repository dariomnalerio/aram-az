"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { JoinClubSchema } from "../_types/JoinClubSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { joinClub } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  userId: string;
  clubId: string;
};

export function JoinClubForm({ userId, clubId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof JoinClubSchema>>({
    resolver: zodResolver(JoinClubSchema),
    defaultValues: {
      clubId,
      userId,
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof JoinClubSchema>) => {
    setIsLoading(true);
    const { username } = values;
    const { error } = await joinClub({ clubId, userId, username });

    if (error) {
      console.error("Failed to join club:", error);
      return;
    }
    setIsLoading(false);
    router.push(`/clubs?club=${clubId}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mx-3'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormDescription className=''>
                Your username will be visible to other club members
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full mt-5' disabled={isLoading}>
          Join Club
        </Button>
      </form>
    </Form>
  );
}
