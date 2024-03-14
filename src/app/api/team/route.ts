import prisma from "@/lib/prisma";
import { MEMBER_VALIDATION } from "@/validators/team-validator";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const team = await prisma.member.findMany({
    include: {
      social: true,
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