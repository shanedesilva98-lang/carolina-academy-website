import type { Article } from "@/types/article";

/**
 * News articles.
 *
 * No real, dated articles were supplied for this build, and the brief
 * explicitly disallows migrating dummy/test posts from the old site. This
 * array intentionally starts empty — the /news pages render a clear
 * "no articles published yet" state until real content is added.
 *
 * To add an article, push an object matching the Article type, e.g.:
 *
 * {
 *   id: "2026-01-new-intake-announcement",
 *   slug: "new-intake-announcement",
 *   title: "New Intake Announcement",
 *   excerpt: "One or two sentence summary shown in article cards.",
 *   featuredImage: { src: "/images/....svg", alt: "Descriptive alt text" },
 *   author: "Carolina Academy",
 *   reviewer: "[optional reviewer name]",
 *   publishedAt: "2026-01-15",
 *   updatedAt: "2026-01-15",
 *   category: "Announcements",
 *   tags: ["intake", "pastry-bakery"],
 *   body: ["Paragraph one.", "Paragraph two."],
 *   sources: [{ label: "TVEC", url: "https://www.tvec.gov.lk" }],
 *   seo: { title: "...", description: "..." },
 * }
 *
 * See CMS_MIGRATION.md and README.md → "Adding a news article".
 */
export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
