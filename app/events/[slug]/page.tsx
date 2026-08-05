import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { Button } from "@/components/ui/button";
import { events, getEventBySlug } from "@/content/events";
import { buildMetadata } from "@/lib/metadata";
import { eventSchema, breadcrumbListSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return buildMetadata({ title: "Event Not Found", description: "This event could not be found.", path: `/events/${slug}`, noindex: true });

  return buildMetadata({
    title: event.seo.title || event.title,
    description: event.seo.description || event.excerpt,
    path: `/events/${event.slug}`,
    image: event.seo.ogImage || event.featuredImage.src,
  });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <SchemaMarkup
        schema={[
          eventSchema(event, `/events/${event.slug}`),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/events/${event.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Events", path: "/events" }, { name: event.title, path: `/events/${event.slug}` }]} />

      <article className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wide text-royal">{event.category}</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-navy sm:text-4xl">{event.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> <time dateTime={event.eventDate}>{formatDate(event.eventDate)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {event.location}
            </span>
          </div>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={event.featuredImage.src} alt={event.featuredImage.alt} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose prose-slate mt-8 max-w-none">
            {event.body.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
          </div>
          {event.registrationUrl ? (
            <Button asChild size="lg" variant="primary" className="mt-6">
              <Link href={event.registrationUrl}>Register Interest</Link>
            </Button>
          ) : null}
          <Link href="/events" className="mt-10 block text-sm font-semibold text-royal hover:underline">
            ← Back to Events
          </Link>
        </div>
      </article>
    </>
  );
}
