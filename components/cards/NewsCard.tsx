import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";

export function NewsCard({ article }: { article: Article }) {
  return (
    <article className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
        <Image
          src={article.featuredImage.src}
          alt={article.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-royal">{article.category}</p>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy">
          <Link href={`/news/${article.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
            <span className="absolute inset-0" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>
        <time dateTime={article.publishedAt} className="mt-auto text-xs text-ink-muted">
          {formatDate(article.publishedAt)}
        </time>
      </div>
    </article>
  );
}
