import { Member, Social } from "@prisma/client";

type Project = {
  id: string;
  slug: string;
  thumbnail?: string;
  name: string;
  smallDescription: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: "COMPLETED" | "IN_PROGRESS" | "PLANNED";
  technologies: string[];
  team: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
};

type TeamMember = Member & {
  social?: Social[];
};

export type { Project, TeamMember };
