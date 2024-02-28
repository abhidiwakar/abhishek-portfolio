import { Skill } from "@/types/skill";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  skill: Skill;
};

const calculateExperience = (experience: Skill["experience"]) => {
  const years = experience.map((exp) => {
    const startDate = dayjs(exp.startDate);
    const endDate = dayjs(exp.endDate);
    return endDate.diff(startDate, "years");
  });

  return years.reduce((acc, curr) => acc + curr, 0);
};

export default function SkillCard({ skill: { imgProps, ...skill } }: Props) {
  const experience = useMemo(
    () => calculateExperience(skill.experience),
    [skill.experience]
  );
  return (
    <div
      className={twMerge(
        "border p-3 rounded-md shadow-sm hover:bg-slate-100 transition-bg"
      )}
    >
      <Image
        priority
        src={skill.icon}
        alt={skill.name}
        className={twMerge("w-8", imgProps?.className)}
      />
      <p className="font-semibold mt-1">{skill.name}</p>
      <small className="text-slate-500">
        {experience < 1 ? "less than a year" : `${experience}+ years`}
      </small>
    </div>
  );
}
