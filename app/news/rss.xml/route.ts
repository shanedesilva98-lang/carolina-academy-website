import { articles } from "@/content/articles";
import { absoluteUrl } from "@/lib/utils";
import { organisation } from "@/content/organisation";

export const dynamic = "force-static";

function escapeXml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${absoluteUrl(`/news/${article.slug}`)}</link>
      <guid>${absoluteUrl(`/news/${article.slug}`)}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${organisation.name} — News & Announcements</title>
    <link>${absoluteUrl("/news")}</link>
    <description>News and announcements from ${organisation.name}</description>
    <language>en-lk</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
