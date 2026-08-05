import type { University } from "@/types/university";

/**
 * South Korea partner / information universities.
 *
 * IMPORTANT: No specific university partnership has been verified for this
 * build. Do not publish named institutions with "Confirmed Partner" status
 * until Carolina Academy supplies a verifiable agreement. The entries below
 * are structural placeholders only, clearly marked [REQUIRES CONFIRMATION],
 * so the section can be populated later without re-engineering the page.
 */

export const universities: University[] = [
  {
    id: "placeholder-university-1",
    slug: "requires-confirmation-1",
    name: "[REQUIRES CONFIRMATION — University Name]",
    city: "[REQUIRES CONFIRMATION]",
    country: "South Korea",
    website: undefined,
    relationshipStatus: "information-only",
    programmeTypes: ["[REQUIRES CONFIRMATION]"],
    entryRequirements: ["[REQUIRES CONFIRMATION]"],
    intakes: ["[REQUIRES CONFIRMATION]"],
    tuitionRange: "[REQUIRES CONFIRMATION]",
    languageRequirements: ["[REQUIRES CONFIRMATION]"],
    description:
      "University partnership details are being confirmed. This placeholder shows how partner-university information will be displayed once verified agreements are in place.",
    lastVerifiedAt: null,
  },
  {
    id: "placeholder-university-2",
    slug: "requires-confirmation-2",
    name: "[REQUIRES CONFIRMATION — University Name]",
    city: "[REQUIRES CONFIRMATION]",
    country: "South Korea",
    website: undefined,
    relationshipStatus: "information-only",
    programmeTypes: ["[REQUIRES CONFIRMATION]"],
    entryRequirements: ["[REQUIRES CONFIRMATION]"],
    intakes: ["[REQUIRES CONFIRMATION]"],
    tuitionRange: "[REQUIRES CONFIRMATION]",
    languageRequirements: ["[REQUIRES CONFIRMATION]"],
    description:
      "University partnership details are being confirmed. This placeholder shows how partner-university information will be displayed once verified agreements are in place.",
    lastVerifiedAt: null,
  },
];

export const partnershipStatusLabels: Record<string, string> = {
  "confirmed-partner": "Confirmed Partner",
  "application-support-available": "Application Support Available",
  "information-only": "Information Only",
};
