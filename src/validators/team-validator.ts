import { z } from "zod";

const SOCIAL_TYPE = z.enum([
  "GITHUB",
  "LINKEDIN",
  "TWITTER",
  "EMAIL",
  "YOUTUBE",
  "SLACK",
  "SKYPE",
]);

export const MEMBER_VALIDATION = z.object({
  id: z.string().uuid().optional(),
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
      z
        .object({
          name: SOCIAL_TYPE,
          link: z.string().trim().min(1, "Link is too short"),
        })
        .refine((val) => {
          // If the social type is EMAIL, then the link should be an email
          if (val.name === "EMAIL") {
            const emailSchema = z.string().trim().email();
            return emailSchema.safeParse(val.link).success;
          }

          // If the social type is SKYPE, then the link should be a valid skype username
          if (val.name === "SKYPE" && val.link.length > 0) return true;

          // If the social type is anything else, then the link should be a valid URL
          const linkSchema = z.string().trim().url();
          return linkSchema.safeParse(val.link).success;
        })
    )
    .optional(),
});
