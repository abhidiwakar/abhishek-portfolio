import Footer from "@/components/Footer";
import InfoCard from "@/components/InfoCard";

import ProjectDetailsHero from "@/components/ProjectDetailsHero";
import { Status, statusText } from "@/components/ui/ProjectStatusPill";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import {
  ArrowLeft,
  CalendarIcon,
  HourglassIcon,
  UserCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
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
        <div className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <small className="text-sm text-gray-400">
            Below are the technologies used in this project.
          </small>
          <div className="flex flex-wrap gap-2 mt-2">
            {projectDetails.technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div
          className="my-4 border rounded-xl p-4"
          dangerouslySetInnerHTML={{
            __html: projectDetails.description,
          }}
        />
        <div className="my-4 border rounded-xl p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Team</h2>
            <small className="text-sm text-gray-400">{`${projectDetails.team.length} member(s)`}</small>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {projectDetails.team.map((member) => (
              <div
                key={member.id}
                className="border border-slate-200 p-4 rounded-xl transition-bg hover:bg-slate-100 flex flex-col items-center gap-2"
              >
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    height={56}
                    width={56}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                ) : (
                  <UserCircle className="w-10 md:w-14 h-10 md:h-14" />
                )}
                <div className="text-center">
                  <p className="text-md lg:text-lg font-semibold">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.occupation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
