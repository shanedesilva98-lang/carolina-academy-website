import { Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { NewsCard } from "@/components/cards/NewsCard";
import { articles } from "@/content/articles";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "News & Announcements | Carolina Academy",
  description: "Announcements, updates and news from Carolina Academy, a TVEC-registered vocational training institute and study-abroad consultancy in Chilaw, Sri Lanka.",
  path: "/news",
});

const PAGE_SIZE = 9;

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = articles.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/news", title: "News & Announcements", description: "Carolina Academy news and announcements." })} />
      <Breadcrumbs items={[{ name: "News & Events", path: "/news" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">News & Announcements</h1>
            <p className="mt-4 max-w-2xl text-white/80">Updates from Carolina Academy&apos;s vocational training and study-abroad programmes.</p>
          </div>
          <a href="/news/rss.xml" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
            <Rss className="h-4 w-4" /> RSS Feed
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          {paginated.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
              {totalPages > 1 ? (
                <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/news?page=${p}`}
                      aria-current={p === page ? "page" : undefined}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${p === page ? "bg-navy text-white" : "bg-surface-soft text-navy"}`}
                    >
                      {p}
                    </a>
                  ))}
                </nav>
              ) : null}
            </>
          ) : (
            <>
              <SectionHeading eyebrow="News & Announcements" title="No Articles Published Yet" />
              <p className="mt-4 max-w-2xl text-ink-muted">
                Carolina Academy has not published any news articles yet. Check back soon, or follow updates via
                phone, email or WhatsApp — see the{" "}
                <a href="/contact" className="font-semibold text-royal hover:underline">
                  Contact page
                </a>
                .
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
