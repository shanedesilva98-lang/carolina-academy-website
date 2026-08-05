/**
 * University / partner-institution data model for the South Korea study-abroad
 * section. Do not add entries here unless a real, verifiable partnership or
 * information-sharing relationship exists — see CMS_MIGRATION.md.
 */

export type PartnershipStatus =
  | "confirmed-partner"
  | "application-support-available"
  | "information-only";

export interface University {
  id: string;
  slug: string;
  name: string;
  koreanName?: string;
  city: string;
  country: string;
  website?: string;
  logo?: {
    src: string;
    alt: string;
  };
  relationshipStatus: PartnershipStatus;
  programmeTypes: string[];
  entryRequirements: string[];
  intakes: string[];
  tuitionRange: string | "[REQUIRES CONFIRMATION]";
  languageRequirements: string[];
  description: string;
  lastVerifiedAt: string | null;
}
