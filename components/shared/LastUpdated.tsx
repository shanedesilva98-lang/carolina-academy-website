import { CalendarClock } from "lucide-react";
import { formatDate } from "@/lib/utils";

/** GEO/AEO content label — shows readers and AI crawlers when a page was last verified. */
export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
      Last updated: <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}
