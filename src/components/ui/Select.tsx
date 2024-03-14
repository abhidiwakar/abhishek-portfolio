import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  errorMessage?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, Props>(function (
  { label, options, className, errorMessage, ...props },
  ref
) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {props.required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-2">
        <select
          ref={ref}
          {...props}
          className={twMerge(
            "w-full rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className,
            clsx({
              "bg-gray-100": props.disabled,
              "ring-red-500": errorMessage,
            })
          )}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <small className="text-xs text-red-500 mt-1">{errorMessage}</small>
        )}
      </div>
    </div>
  );
});

Select.displayName = "Select";

export { Select };
