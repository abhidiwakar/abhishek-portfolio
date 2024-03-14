import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const validUUIDRegex =
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = new RegExp(validUUIDRegex);
  return uuidRegex.test(uuid);
};

export const slugify = (str: string) => {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
