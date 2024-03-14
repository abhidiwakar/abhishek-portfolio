import InfoCard from "@/components/InfoCard";

import ProjectDetailsHero from "@/components/ProjectDetailsHero";
import { Status, statusText } from "@/components/ui/ProjectStatusPill";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { ArrowLeft, CalendarIcon, HourglassIcon, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProjectDetails({ params: { slug } }: Props) {
  const projectDetails = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      team: true,
    },
  });

  if (!projectDetails) {
    notFound();
  }

  return (
    <div className="container sm:my-6">
      <div className="sm:flex mb-2 hidden">
        <Link
          href="/"
          className="my-3 flex items-center gap-2 hover:bg-slate-100 px-3 py-1 rounded"
        >
          <ArrowLeft />
          <span>Go to Home</span>
        </Link>
      </div>
      <ProjectDetailsHero
        title={projectDetails.name}
        description={projectDetails.smallDescription}
        status={projectDetails.status}
      />
      <div className="p-4 sm:p-0 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-4 gap-4">
          <InfoCard title="Start Date" icon={<CalendarIcon />}>
            <span className="text-md sm:text-xl">
              {dayjs(projectDetails.startDate).format("MMMM, YYYY")}
            </span>
          </InfoCard>
          <InfoCard title="End Date" icon={<CalendarIcon />}>
            <span className="text-md sm:text-xl">
              {projectDetails.endDate
                ? dayjs(projectDetails.endDate).format("MMMM, YYYY")
                : "N/A"}
            </span>
          </InfoCard>
          <InfoCard title="Status" icon={<HourglassIcon />}>
            <span className="text-md sm:text-xl">
              {statusText[projectDetails.status as Status] ?? "Unknown"}
            </span>
          </InfoCard>
          <InfoCard title="Team Size" icon={<Users />}>
            <span className="text-md sm:text-xl">
              {projectDetails.team.length} member(s)
            </span>
          </InfoCard>
        </div>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: projectDetails.description,
          }}
        />
      </div>
    </div>
  );
}
