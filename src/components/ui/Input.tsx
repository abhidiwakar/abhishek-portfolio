import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  className?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(function (
  { label, className, errorMessage, ...props },
  ref
) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {props.required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-2">
        <input
          ref={ref}
          {...props}
          className={twMerge(
            "block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className,
            clsx({
              "bg-gray-100": props.disabled,
              "ring-red-500": errorMessage,
            })
          )}
        />
        {errorMessage && (
          <small className="text-xs text-red-500 mt-1">{errorMessage}</small>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
