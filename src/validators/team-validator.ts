import { z } from "zod";

export const MEMBER_VALIDATION = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is too short")
    .max(100, "Name is too long"),
  occupation: z
    .string()
    .trim()
    .min(3, "Occupation is too short")
    .max(100, "Occupation is too long"),
  avatar: z.string().url().optional(),
  social: z
    .array(
      z.object({
        name: z.string().trim().min(3).max(100),
        link: z.string().url(),
      })
    )
    .optional(),
});
