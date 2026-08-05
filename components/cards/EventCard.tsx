import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { EventItem } from "@/types/article";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
        <Image
          src={event.featuredImage.src}
          alt={event.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-royal">{event.category}</p>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy">
          <Link href={`/events/${event.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
            <span className="absolute inset-0" aria-hidden="true" />
            {event.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{event.excerpt}</p>
        <div className="mt-auto flex flex-col gap-1 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> <time dateTime={event.eventDate}>{formatDate(event.eventDate)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {event.location}
          </span>
        </div>
      </div>
    </article>
  );
}
