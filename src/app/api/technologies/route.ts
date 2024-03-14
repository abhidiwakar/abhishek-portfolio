import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const technologies = await prisma.project.findMany({
    select: {
      technologies: true,
    },
    where:
      search.length > 0
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
  });

  const uniqueTechnologies = new Set(
    technologies.flatMap((project) => project.technologies)
  );
  return Response.json(Array.from(uniqueTechnologies));
};
