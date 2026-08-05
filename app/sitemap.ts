import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";
import { articles } from "@/content/articles";
import { events } from "@/content/events";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/courses", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/courses/hospitality", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/courses/technology", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/courses/health-sciences", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/study-abroad", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/study-abroad/south-korea", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/study-abroad/south-korea/visa-guidance", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/study-abroad/application-process", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/student-stories", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/facilities", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/locations/chilaw", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/apply", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.slug}`),
    lastModified: new Date(course.updatedAt),
    changeFrequency: "monthly",
    priority: course.status === "active" ? 0.9 : 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl(`/events/${event.slug}`),
    lastModified: new Date(event.updatedAt),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...courseEntries, ...articleEntries, ...eventEntries];
}
