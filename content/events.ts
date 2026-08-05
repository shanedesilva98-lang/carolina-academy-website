import type { EventItem } from "@/types/article";

/**
 * Events.
 *
 * No real, confirmed events were supplied for this build, and the brief
 * explicitly disallows migrating test events from the old site. This array
 * intentionally starts empty — the /events pages render a clear
 * "no upcoming events" state until real events are added.
 *
 * To add an event, push an object matching the EventItem type, e.g.:
 *
 * {
 *   id: "2026-02-open-day",
 *   slug: "open-day-2026",
 *   title: "Carolina Academy Open Day",
 *   excerpt: "One or two sentence summary shown in event cards.",
 *   featuredImage: { src: "/images/....svg", alt: "Descriptive alt text" },
 *   author: "Carolina Academy",
 *   publishedAt: "2026-02-01",
 *   updatedAt: "2026-02-01",
 *   category: "Open Day",
 *   tags: ["open-day", "chilaw"],
 *   body: ["Paragraph one.", "Paragraph two."],
 *   eventDate: "2026-03-01",
 *   location: "Carolina Beach Resort, Chilaw",
 *   registrationUrl: "/contact",
 *   seo: { title: "...", description: "..." },
 * }
 *
 * See CMS_MIGRATION.md and README.md → "Adding a news article".
 */
export const events: EventItem[] = [];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
