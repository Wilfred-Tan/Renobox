import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { siteUrl } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/commercial", "/residential", "/portfolio", "/about", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
