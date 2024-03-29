import { PROJECT_CACHE_KEY } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { MEMBER_VALIDATION } from "@/validators/team-validator";
import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const team = await prisma.member.findMany({
    include: {
      social: {
        select: {
          id: true,
          name: true,
          link: true,
        },
      },
    },
    where:
      search.length > 0
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
  });

  return Response.json(team);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validatedData = MEMBER_VALIDATION.safeParse(body);

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

  const member = await prisma.member.create({
    include: {
      social: {
        select: {
          id: true,
          name: true,
          link: true,
        },
      },
    },
    data: {
      ...validatedData.data,
      social:
        validatedData.data.social && validatedData.data.social.length > 0
          ? {
              createMany: {
                data: validatedData.data.social?.map((social) => ({
                  link: social.link,
                  name: social.name,
                })),
              },
            }
          : undefined,
    },
  });

  return Response.json(member, { status: 201 });
};

export const PUT = async (request: NextRequest) => {
  const body = await request.json();
  const validatedData = MEMBER_VALIDATION.safeParse(body);

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

  if (!validatedData.data.id) {
    return Response.json(
      { message: "Invalid data! Id missing." },
      { status: 400 }
    );
  }

  const id = validatedData.data.id;

  // Update the member
  const member = await prisma.member.update({
    include: {
      social: {
        select: {
          id: true,
          name: true,
          link: true,
        },
      },
    },
    where: {
      id,
    },
    data: {
      ...validatedData.data,
      social:
        validatedData.data.social && validatedData.data.social.length > 0
          ? {
              deleteMany: {
                memberId: id,
              },
              createMany: {
                data: validatedData.data.social?.map((social) => ({
                  link: social.link,
                  name: social.name,
                })),
              },
            }
          : {
              deleteMany: {
                memberId: id,
              },
            },
    },
  });

  // Invalidate the project cache because we updated the member
  await kv.del(PROJECT_CACHE_KEY);

  return Response.json(member);
};
