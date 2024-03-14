import { Project } from "@/types/project";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  project: Project;
};

const statusText = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  PLANNED: "Planned",
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <Link
        href={`/project/${project.slug}`}
        className="text-lg font-semibold hover:underline"
      >
        {project.name}
      </Link>
      <p className="text-sm text-slate-400">{project.smallDescription}</p>
      <p className="text-sm text-slate-400">
        {dayjs(project.startDate).format("MMM, YYYY")}{" "}
        {project.endDate
          ? ` - ${dayjs(project.endDate).format("MMM, YYYY")}`
          : ""}
      </p>
      <p>
        <span
          className={twMerge(
            "text-xs text-slate-400 px-2 py-1 rounded-full inline-block mt-2",
            clsx({
              "bg-green-500 text-white": project.status === "COMPLETED",
              "bg-yellow-500 text-black": project.status === "IN_PROGRESS",
              "bg-slate-200 text-black": project.status === "PLANNED",
            })
          )}
        >
          {statusText[project.status] ?? "Unknown"}
        </span>
      </p>
    </div>
  );
}
