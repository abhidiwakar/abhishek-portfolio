import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { ADD_PROJECT_VALIDATION } from "@/validators/project-validator";
import { generate as generateShortUUID } from "short-uuid";

export const GET = async () => {
  const projects = await prisma.project.findMany({
    include: {
      team: true,
    },
    orderBy: {
      startDate: "desc",
    },
  });
  return Response.json(projects);
};

export const POST = async (req: Request) => {
  // Parse the request body
  const body = await req.json();
  const validatedData = ADD_PROJECT_VALIDATION.safeParse(body);

  // If the data is invalid, return an error response
  if (!validatedData.success) {
    return Response.json(
      {
        message: "Invalid data",
        errors: validatedData.error.errors,
      },
      {
        status: 400,
      }
    );
  }

  const { team, ...data } = validatedData.data;

  const project = await prisma.project.create({
    include: {
      team: true,
    },
    data: {
      slug: `${generateShortUUID().toLowerCase()}-${slugify(data.name)}`,
      ...data,
      team: {
        connect: team.map((id) => ({ id })),
      },
    },
  });

  return Response.json(project, { status: 201 });
};
