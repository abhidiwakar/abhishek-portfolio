import { Experience } from "@/types/experience";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  experience: Experience[];
};

export default function Timeline({ className, experience }: Props) {
  return (
    <ol
      className={twMerge(
        "relative border-s border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {...experience.map((exp, index) => (
        <li className="mb-10 ms-4" key={index}>
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {dayjs(exp.startDate).format("MMMM YYYY")} -{" "}
            {exp.endDate ? dayjs(exp.endDate).format("MMMM YYYY") : "Present"}
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {exp.title}
          </h3>
          <h4 className="text-base font-semibold text-gray-500 dark:text-gray-400">
            {exp.company}
          </h4>
          <h5 className="text-sm font-semibold text-gray-400 dark:text-gray-500">
            {exp.location}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {exp.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
