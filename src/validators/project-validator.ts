import { validUUIDRegex } from "@/lib/utils";
import dayjs from "dayjs";
import { z } from "zod";

export const ADD_PROJECT_VALIDATION = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters long.")
      .max(100, "Project name must be at most 100 characters long."),
    description: z.string().trim(),
    smallDescription: z
      .string()
      .trim()
      .min(10, "Small Description must be at least 10 characters long.")
      .max(100, "Small Description must be at most 100 characters long."),
    team: z
      .array(z.string().regex(new RegExp(validUUIDRegex)))
      .min(1, "At least 1 team member is required"),
    startDate: z.preprocess(
      (val) =>
        typeof val === "string" && dayjs(val).isValid()
          ? dayjs(val).toDate()
          : val,
      z.date({
        invalid_type_error: "Start date must be a valid date",
      })
    ),
    endDate: z
      .preprocess(
        (val) =>
          typeof val === "string" && dayjs(val).isValid()
            ? dayjs(val).toDate()
            : val,
        z.date({
          invalid_type_error: "End date must be a valid date",
        })
      )
      .optional(),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "PLANNED"]),
    thumbnail: z.string().url().optional(),
    technologies: z
      .array(z.string().trim(), {
        required_error: "Technologies are required",
        invalid_type_error: "Please select a valid technology",
      })
      .min(1, "At least 1 technology is required"),
  })
  .refine((vals) => {
    if (vals.status === "COMPLETED") {
      return vals.endDate !== undefined;
    }
    return true;
  }, "End date is required for completed projects");
