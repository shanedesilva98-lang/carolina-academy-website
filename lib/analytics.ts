"use client";

/**
 * Thin analytics/event-tracking abstraction. Wraps GA4 (gtag), GTM dataLayer
 * and Meta Pixel so components only need to call `trackEvent(...)`.
 *
 * Wire up real IDs via NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID and
 * NEXT_PUBLIC_META_PIXEL_ID in .env.local, then load the provider scripts in
 * app/layout.tsx (see README.md → "Analytics setup"). Until those env vars
 * are set, trackEvent() is a safe no-op that logs to the console in
 * development only.
 */

export type AnalyticsEvent =
  | "course_application_started"
  | "course_application_completed"
  | "study_abroad_form_submitted"
  | "whatsapp_click"
  | "telephone_click"
  | "email_click"
  | "brochure_download"
  | "consultation_booking"
  | "university_enquiry"
  | "map_direction_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    // Never let analytics failures break the UI.
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
