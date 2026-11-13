import { MARKETING_CONSENT_TEXT, NO_EMAIL_PLACEHOLDER, PRIVACY_POLICY_VERSION } from "@/lib/consent-text";
import { getCourseBySlug } from "@/content/courses";
import type { LeadFormPayload } from "@/types/form";

/**
 * Pure formatting for lead emails (no I/O), so it can be tested without SMTP.
 *
 * Privacy rules enforced here:
 * - NIC / passport numbers are never written into an email, even if a client
 *   sends them (see BLOCKED_FIELDS). The website forms do not ask for them.
 * - Subjects are static; no applicant text ever reaches a header.
 * - Everything interpolated into HTML is escaped.
 */

const BLOCKED_FIELDS = new Set(["nic", "passport", "passportNumber", "nicNumber", "consent", "marketingConsent", "companyWebsite"]);

const KIND_LABEL: Record<LeadFormPayload["kind"], string> = {
  contact: "New Contact Enquiry",
  "course-application": "New Course Application",
  "study-abroad-eligibility": "New Study Abroad Eligibility Submission",
  consultation: "New Consultation Booking",
};

const FIELD_LABEL: Record<string, string> = {
  fullName: "Full name",
  email: "Email",
  telephone: "Telephone",
  whatsappNumber: "WhatsApp number",
  enquiryType: "Enquiry type",
  courseOrDestination: "Course or destination",
  preferredContactMethod: "Preferred contact method",
  message: "Message",
  dateOfBirth: "Date of birth",
  address: "Address",
  courseSlug: "Course",
  highestEducation: "Highest education",
  preferredIntake: "Preferred intake",
  destination: "Destination",
  pathway: "Pathway",
  englishProficiency: "English level",
  koreanProficiency: "Korean level",
  intendedIntake: "Intended intake",
  consultationType: "Consultation type",
  preferredDate: "Preferred date",
};

export interface FormattedEmail {
  subject: string;
  text: string;
  html: string;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so a value can never break out of a header line. */
export function singleLine(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

export function hasRealEmail(payload: LeadFormPayload): boolean {
  const email = payload.data.email?.trim().toLowerCase();
  return Boolean(email) && email !== NO_EMAIL_PLACEHOLDER;
}

function rows(payload: LeadFormPayload): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(payload.data)) {
    if (BLOCKED_FIELDS.has(key)) continue;
    if (typeof value !== "string" || value.trim() === "") continue;
    if (key === "email" && !hasRealEmail(payload)) {
      out.push(["Email", "Not provided"]);
      continue;
    }
    const multiline = key === "message" || key === "address";
    let shown = multiline ? value.trim() : singleLine(value);
    if (key === "courseSlug") shown = getCourseBySlug(shown)?.shortTitle ?? shown;
    out.push([FIELD_LABEL[key] ?? key, shown]);
  }
  return out;
}

function consentRows(payload: LeadFormPayload, receivedAt: Date): Array<[string, string]> {
  const marketing = payload.data.marketingConsent === true;
  return [
    ["Received (UTC)", receivedAt.toISOString()],
    ["Enquiry follow-up consent", payload.data.consent ? "Yes" : "No"],
    ["Promotional marketing consent", marketing ? "YES — opted in" : "No — do not send promotional marketing"],
    ["Privacy Policy version shown", PRIVACY_POLICY_VERSION],
  ];
}

function table(items: Array<[string, string]>): string {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${items
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #e5e7eb;color:#475569;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(k)}</strong></td><td style="border-bottom:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    )
    .join("")}</table>`;
}

function toText(items: Array<[string, string]>): string {
  return items.map(([k, v]) => `${k}: ${v}`).join("\n");
}

export function staffNotificationEmail(payload: LeadFormPayload, receivedAt: Date): FormattedEmail {
  const details = rows(payload);
  const consent = consentRows(payload, receivedAt);
  const idNote =
    "Identity documents (NIC / passport) are not collected on the website. Ask the applicant for them securely when they are needed.";
  const subject = `Carolina Academy website: ${KIND_LABEL[payload.kind]}`;

  return {
    subject,
    text: `${KIND_LABEL[payload.kind]}\n\n${toText(details)}\n\n--- Consent record ---\n${toText(consent)}\n\n${idNote}\n`,
    html: `<h2 style="font-family:Arial,sans-serif">${escapeHtml(KIND_LABEL[payload.kind])}</h2>${table(details)}<h3 style="font-family:Arial,sans-serif">Consent record</h3>${table(consent)}<p style="font-family:Arial,sans-serif;font-size:13px;color:#475569">${escapeHtml(idNote)}</p>`,
  };
}

/** Separate, filterable record created only when the person ticked the optional marketing box. */
export function marketingConsentRecordEmail(payload: LeadFormPayload, receivedAt: Date): FormattedEmail {
  const items: Array<[string, string]> = [
    ["Name", payload.data.fullName],
    ["Email", hasRealEmail(payload) ? payload.data.email : "Not provided"],
    ["Telephone", payload.data.telephone],
    ["WhatsApp number", payload.data.whatsappNumber?.trim() || "Not provided"],
    ["Form", KIND_LABEL[payload.kind]],
    ["Opted in (UTC)", receivedAt.toISOString()],
    ["Privacy Policy version shown", PRIVACY_POLICY_VERSION],
    ["Wording the person agreed to", MARKETING_CONSENT_TEXT],
  ];
  return {
    subject: "[Marketing opt-in] Carolina Academy website consent record",
    text: `Marketing consent record\n\n${toText(items)}\n`,
    html: `<h2 style="font-family:Arial,sans-serif">Marketing consent record</h2>${table(items)}`,
  };
}

export function applicantConfirmationEmail(payload: LeadFormPayload, siteUrl: string): FormattedEmail | null {
  if (!hasRealEmail(payload)) return null;
  const name = escapeHtml(singleLine(payload.data.fullName));
  const subject = "Thank you for contacting Carolina Academy";
  const policy = `${siteUrl}/privacy-policy`;
  const body = `We have received your submission and a member of our team will contact you shortly, usually within 1–2 working days (Monday to Saturday, 10:00 AM – 5:30 PM). If your enquiry is urgent, you can call the Hospitality Training Center on +94 77 383 1955, the Study Abroad Office on +94 71 637 3334, or message us on WhatsApp. Please do not email passport, NIC or bank details unless we ask you to.`;
  return {
    subject,
    text: `Dear ${singleLine(payload.data.fullName)},\n\n${body}\n\nYour information is handled in line with our Privacy Policy: ${policy}\n\nWarm regards,\nCarolina Academy\n`,
    html: `<p>Dear ${name},</p><p>${escapeHtml(body)}</p><p>Your information is handled in line with our <a href="${escapeHtml(policy)}">Privacy Policy</a>.</p><p>Warm regards,<br/>Carolina Academy<br/>Hospitality Training Center — Slot A1, Carolina Beach Resort, Ambakandawila Road, Chilaw, Sri Lanka<br/>Study Abroad Office — 1665/A, 1st Floor, Colombo Road, Kurana, Katunayake, Sri Lanka</p>`,
  };
}
