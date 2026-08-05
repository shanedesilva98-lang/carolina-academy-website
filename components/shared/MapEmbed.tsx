"use client";

import { MapPin } from "lucide-react";
import { organisation } from "@/content/organisation";
import { trackEvent } from "@/lib/analytics";

/**
 * Google Maps embed. Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL to an "Embed a map"
 * URL from Google Maps to enable the live map; until then a directions link
 * is shown as a graceful fallback.
 */
export function MapEmbed() {
  const embedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(organisation.address.full)}`;

  if (embedUrl) {
    return (
      <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-border">
        <iframe
          src={embedUrl}
          title="Map showing Carolina Academy, Chilaw"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("map_direction_click", { source: "map-embed" })}
      className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface-soft p-8 text-center transition-colors hover:bg-surface-soft/70"
    >
      <MapPin className="h-8 w-8 text-royal" aria-hidden="true" />
      <p className="font-heading font-bold text-navy">Get Directions to Carolina Academy</p>
      <p className="max-w-xs text-sm text-ink-muted">{organisation.address.full}</p>
      <span className="text-sm font-semibold text-royal underline-offset-4 hover:underline">Open in Google Maps</span>
    </a>
  );
}
