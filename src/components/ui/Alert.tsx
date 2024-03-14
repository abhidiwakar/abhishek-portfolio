import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "error" | "info" | "warning" | "success";
  titleClassName?: string;
  titlePrefix?: React.ReactNode;
};

export default function Alert({
  title,
  children,
  variant = "info",
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        "border p-3 rounded-md",
        clsx({
          "border-red-500 bg-red-100": variant === "error",
          "border-orange-500 bg-orange-100": variant === "warning",
          "border-blue-500 bg-blue-100": variant === "info",
          "border-green-500 bg-green-100": variant === "success",
        }),
        props.className
      )}
    >
      {title && (
        <div
          className={twMerge(
            "text-xl font-semibold flex items-center gap-2",
            props.titleClassName
          )}
        >
          {props.titlePrefix}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
