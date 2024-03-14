"use client";

import HeroImage from "@/assets/images/yannik-mika-ymRMOsSgRRA-unsplash.jpg";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectStatusPill, { Status } from "./ui/ProjectStatusPill";
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  title: string;
  description: string;
  status: string;
};

export default function ProjectDetailsHero({
  title,
  description,
  status,
}: Props) {
  return (
    <div className="min-h-[400px] sm:rounded-xl p-8 flex flex-col justify-end relative bg-slate-200">
      <Image
        priority
        src={HeroImage}
        alt="Hero Image"
        className="absolute inset-0 object-cover w-full h-full sm:rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 sm:rounded-xl"></div>
      <div className="relative z-10 flex-1 flex justify-end items-start">
        <Link
          rel="noopener noreferrer"
          href="https://drive.google.com/file/d/1Ain0dm4kBTLIyQ6p4XccuwkI0Dd59v1y/view?usp=sharing"
          className="text-white text-sm flex items-center gap-2 border px-2 py-1 rounded-md"
          target="_blank"
        >
          <Download size={20} />
          <span>Download Resume</span>
        </Link>
      </div>
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">{title}</h1>
        <p className="text-slate-300">{description}</p>
        <ProjectStatusPill status={status as Status} className="mt-2" />
      </div>
    </div>
  );
}
