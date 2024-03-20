import { PROJECT_CACHE_KEY } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { ADD_PROJECT_VALIDATION } from "@/validators/project-validator";
import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";
import { generate as generateShortUUID } from "short-uuid";

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get("slug");

  if (process.env.NODE_ENV !== "development") {
    const cachedResponse = await kv.get(slug || PROJECT_CACHE_KEY);
    // If we have a cached response, return it instead of fetching from the database.
    if (cachedResponse) {
      return Response.json(cachedResponse);
    }
  }

  const projects = await prisma.project.findMany({
    include: {
      team: {
        include: {
          social: {
            select: {
              id: true,
              name: true,
              link: true,
            },
          },
        },
      },
    },
    where: slug ? { slug } : undefined,
    orderBy: {
      startDate: "desc",
    },
  });

  if (process.env.NODE_ENV !== "development" && projects.length > 0) {
    // Cache the response for 7 days.
    await kv.set(slug || PROJECT_CACHE_KEY, JSON.stringify(projects), {
      ex: 60 * 60 * 24 * 7,
    });
  }

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
      team: {
        include: {
          social: {
            select: {
              id: true,
              name: true,
              link: true,
            },
          },
        },
      },
    },
    data: {
      slug: `${generateShortUUID().toLowerCase()}-${slugify(data.name)}`,
      ...data,
      team: {
        connect: team.map((id) => ({ id })),
      },
    },
  });

  // Invalidate the cache
  await kv.del(PROJECT_CACHE_KEY);

  return Response.json(project, { status: 201 });
};

export const PUT = async (req: Request) => {
  // Parse the request body
  const body = await req.json();
  const validatedData = ADD_PROJECT_VALIDATION.safeParse(body);

  // If the data is invalid, return an error response
  if (!validatedData.success || !validatedData.data.id) {
    return Response.json(
      {
        message: "Invalid data",
        errors: !validatedData.success
          ? validatedData.error.errors
          : "ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const { team, ...data } = validatedData.data;

  const project = await prisma.project.update({
    where: {
      id: data.id,
    },
    include: {
      team: {
        include: {
          social: {
            select: {
              id: true,
              name: true,
              link: true,
            },
          },
        },
      },
    },
    data: {
      ...data,
      team: {
        connect: team.map((id) => ({ id })),
      },
    },
  });

  // Invalidate the cache
  await kv.del(PROJECT_CACHE_KEY);
  await kv.del(project.slug);

  return Response.json(project, { status: 200 });
};
