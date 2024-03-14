import { Project } from "@/types/project";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import ProjectStatusPill from "./ProjectStatusPill";

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
      <ProjectStatusPill status={project.status} className="mt-2" />
    </div>
  );
}
