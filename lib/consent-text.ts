/**
 * Consent wording and policy version shared by the forms (client) and the
 * staff email records (server). Keep in one place so the wording a person
 * saw is exactly the wording recorded. Update POLICY_VERSION whenever
 * app/privacy-policy/page.tsx changes materially.
 */

export const PRIVACY_POLICY_VERSION = "2026-11-05";

export const ENQUIRY_CONSENT_TEXT =
  "I consent to Carolina Academy contacting me about this enquiry and understand my information will be handled in line with the Privacy Policy.";

export const MARKETING_CONSENT_TEXT =
  "I would also like to receive news about Carolina Academy courses, intakes and events by email, phone or WhatsApp. This is optional, and I can opt out at any time.";

/** Placeholder email used by the quick callback form, which does not ask for one. */
export const NO_EMAIL_PLACEHOLDER = "not-provided@carolinaacademy.lk";
