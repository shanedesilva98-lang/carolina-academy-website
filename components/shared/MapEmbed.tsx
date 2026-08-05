"use client";

import { MapPin } from "lucide-react";
import { locations, type OrganisationLocation } from "@/content/organisation";
import { trackEvent } from "@/lib/analytics";

/**
 * Google Maps embed for a Carolina Academy location. Set the location's
 * `mapsEmbedEnvVar` (see content/organisation.ts) to an "Embed a map" URL
 * from Google Maps to enable the live map; until then a directions link is
 * shown as a graceful fallback.
 */
export function MapEmbed({ location = locations[0] }: { location?: OrganisationLocation }) {
  // NEXT_PUBLIC_ vars must be referenced as static property accesses for
  // Next.js to inline them into the client bundle — a dynamic/bracketed
  // lookup by location.mapsEmbedEnvVar would always be undefined in the browser.
  const embedUrl =
    location.id === "chilaw"
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL_CHILAW
      : process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL_KATUNAYAKE;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.full)}`;

  if (embedUrl) {
    return (
      <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-border">
        <iframe
          src={embedUrl}
          title={`Map showing Carolina Academy's ${location.name}, ${location.city}`}
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
      onClick={() => trackEvent("map_direction_click", { source: "map-embed", location: location.id })}
      className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface-soft p-8 text-center transition-colors hover:bg-surface-soft/70"
    >
      <MapPin className="h-8 w-8 text-royal" aria-hidden="true" />
      <p className="font-heading font-bold text-navy">Get Directions to the {location.name}</p>
      <p className="max-w-xs text-sm text-ink-muted">{location.full}</p>
      <span className="text-sm font-semibold text-royal underline-offset-4 hover:underline">Open in Google Maps</span>
    </a>
  );
}
