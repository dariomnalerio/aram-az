import { z } from "zod";

export const JoinClubSchema = z.object({
  clubId: z.string().min(1),
  userId: z.string().min(1),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(13, { message: "Username is too long" }),
});
