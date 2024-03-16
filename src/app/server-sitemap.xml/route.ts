import { getAPIUrl } from "@/lib/fetcher";
import { Project } from "@/types/project";
import { IImageEntry, ISitemapField, getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  const projects: Project[] = await (await fetch(getAPIUrl("/project"))).json();

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
