import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const statusText = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  PLANNED: "Planned",
};

export type Status = keyof typeof statusText;

type Props = {
  status: Status;
  className?: string;
};

export default function ProjectStatusPill({ status, ...props }: Props) {
  return (
    <p>
      <span
        className={twMerge(
          "text-xs text-slate-400 px-2 py-1 rounded-full inline-block",
          clsx({
            "bg-green-500 text-white": status === "COMPLETED",
            "bg-yellow-500 text-black": status === "IN_PROGRESS",
            "bg-slate-200 text-black": status === "PLANNED",
          }),
          props.className
        )}
      >
        {statusText[status] ?? "Unknown"}
      </span>
    </p>
  );
}
