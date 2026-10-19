import type { MetadataRoute } from "next";
import { projectsData } from "@/lib/projects";

const siteUrl = "https://www.devraphaeldiniz.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projectsData.map((project) => ({
      url: `${siteUrl}/projetos/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
