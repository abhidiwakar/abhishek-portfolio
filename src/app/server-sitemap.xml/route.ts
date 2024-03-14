import prisma from "@/lib/prisma";
import { IImageEntry, ISitemapField, getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  const projects = await prisma.project.findMany({
    select: {
      name: true,
      thumbnail: true,
      slug: true,
      updatedAt: true,
    },
  });

  return getServerSideSitemap([
    ...projects.map(
      (project) =>
        ({
          loc: `${process.env.NEXT_PUBLIC_BASE_URL}/project/${project.slug}`,
          lastmod: new Date(project.updatedAt).toISOString(),
          changefreq: "weekly",
          priority: 0.7,
          images: project.thumbnail
            ? [
                {
                  title: project.name,
                  loc: new URL(project.thumbnail),
                } as IImageEntry,
              ]
            : [],
        } as ISitemapField)
    ),
  ]);
}
