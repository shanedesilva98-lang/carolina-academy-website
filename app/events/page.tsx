import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { events } from "@/content/events";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Events | Carolina Academy",
  description: "Upcoming events, open days and information sessions from Carolina Academy in Chilaw, Sri Lanka.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/events", title: "Events", description: "Carolina Academy events." })} />
      <Breadcrumbs items={[{ name: "News & Events", path: "/news" }, { name: "Events", path: "/events" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Events</h1>
          <p className="mt-4 max-w-2xl text-white/80">Open days, information sessions and other events hosted by Carolina Academy.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <>
              <SectionHeading eyebrow="Events" title="No Upcoming Events" />
              <p className="mt-4 max-w-2xl text-ink-muted">
                Carolina Academy has no events scheduled at this time. Check back soon, or{" "}
                <a href="/contact" className="font-semibold text-royal hover:underline">
                  contact us
                </a>{" "}
                to ask about upcoming open days and information sessions.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
