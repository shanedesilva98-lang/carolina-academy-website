import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { articles, getArticleBySlug } from "@/content/articles";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbListSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return buildMetadata({ title: "Article Not Found", description: "This article could not be found.", path: `/news/${slug}`, noindex: true });

  return buildMetadata({
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt,
    path: `/news/${article.slug}`,
    image: article.seo.ogImage || article.featuredImage.src,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <SchemaMarkup
        schema={[
          articleSchema(article, `/news/${article.slug}`),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "News & Events", path: "/news" },
            { name: article.title, path: `/news/${article.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "News & Events", path: "/news" }, { name: article.title, path: `/news/${article.slug}` }]} />

      <article className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wide text-royal">{article.category}</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-navy sm:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
            <span>By {article.author}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <LastUpdated date={article.updatedAt} />
          </div>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose prose-slate mt-8 max-w-none">
            {article.body.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
          </div>
          {article.sources.length > 0 ? (
            <div className="mt-10 border-t border-border pt-6">
              <h2 className="font-heading text-sm font-bold text-navy">Sources</h2>
              <ul className="mt-2 flex flex-col gap-1">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-royal hover:underline">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <Link href="/news" className="mt-10 inline-block text-sm font-semibold text-royal hover:underline">
            ← Back to News & Announcements
          </Link>
        </div>
      </article>
    </>
  );
}
