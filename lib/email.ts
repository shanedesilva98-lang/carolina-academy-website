import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { LeadFormPayload, LeadSubmissionResult } from "@/types/form";
import {
  applicantConfirmationEmail,
  hasRealEmail,
  marketingConsentRecordEmail,
  singleLine,
  staffNotificationEmail,
  type FormattedEmail,
} from "@/lib/lead-email";

/**
 * Lead delivery over SMTP (Zoho Mail).
 *
 * Server-only. Called by app/api/contact and app/api/applications.
 *
 * Guarantees:
 * - A submission is reported as successful ONLY after the staff notification
 *   email has been accepted by the SMTP server.
 * - Applicant data is never written to logs. Failures log the form kind and
 *   a short error code only.
 * - NIC/passport numbers are never emailed (see lib/lead-email.ts).
 * - In production/preview, missing SMTP settings are a hard failure, not a
 *   silent success. The dev-only mock records nothing.
 *
 * Environment (server-only, never NEXT_PUBLIC_): SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS, ADMIN_NOTIFICATION_EMAIL; optional SMTP_FROM,
 * MARKETING_CONSENT_LOG_EMAIL, NEXT_PUBLIC_SITE_URL. See .env.example.
 */

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  staffTo: string;
  consentLogTo: string;
  siteUrl: string;
}

function readConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_NOTIFICATION_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_NOTIFICATION_EMAIL) return null;
  const port = Number(SMTP_PORT || 465);
  if (!Number.isInteger(port) || port <= 0) return null;
  return {
    host: SMTP_HOST,
    port,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: process.env.SMTP_FROM || SMTP_USER,
    staffTo: ADMIN_NOTIFICATION_EMAIL,
    consentLogTo: process.env.MARKETING_CONSENT_LOG_EMAIL || ADMIN_NOTIFICATION_EMAIL,
    siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://carolinaacademy.lk").replace(/\/$/, ""),
  };
}

function createTransport(config: SmtpConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

async function send(transport: Transporter, config: SmtpConfig, to: string, email: FormattedEmail, replyTo?: string) {
  await transport.sendMail({
    from: `Carolina Academy Website <${config.from}>`,
    to,
    replyTo,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

const FAILURE: LeadSubmissionResult = {
  success: false,
  message: "Something went wrong while sending your submission. Please try again or contact us directly.",
};

const SUCCESS: LeadSubmissionResult = {
  success: true,
  message: "Thank you — your submission has been received. Our team will contact you shortly.",
};

/** Log without any applicant data: form kind and error code only. */
function logFailure(kind: LeadFormPayload["kind"], stage: string, error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String((error as { code: unknown }).code) : "UNKNOWN";
  console.error(`[lead] ${stage} failed kind=${kind} code=${code}`);
}

export async function submitLead(payload: LeadFormPayload): Promise<LeadSubmissionResult> {
  const config = readConfig();

  if (!config) {
    if (process.env.NODE_ENV === "development") {
      // Dev-only mock: nothing is sent or stored. Never active in production.
      console.info(`[lead:dev-mock] ${payload.kind} received (not delivered: SMTP not configured)`);
      return SUCCESS;
    }
    console.error(`[lead] SMTP is not configured; submission kind=${payload.kind} was NOT delivered`);
    return FAILURE;
  }

  const receivedAt = new Date();
  const transport = createTransport(config);
  const replyTo = hasRealEmail(payload) ? singleLine(payload.data.email) : undefined;

  try {
    await send(transport, config, config.staffTo, staffNotificationEmail(payload, receivedAt), replyTo);
  } catch (error) {
    logFailure(payload.kind, "staff-notification", error);
    return FAILURE;
  }

  // The submission is now safely with staff. The remaining emails are best effort.
  if (payload.data.marketingConsent === true) {
    try {
      await send(transport, config, config.consentLogTo, marketingConsentRecordEmail(payload, receivedAt));
    } catch (error) {
      logFailure(payload.kind, "marketing-consent-record", error);
    }
  }

  const confirmation = applicantConfirmationEmail(payload, config.siteUrl);
  if (confirmation) {
    try {
      await send(transport, config, singleLine(payload.data.email), confirmation);
    } catch (error) {
      logFailure(payload.kind, "applicant-confirmation", error);
    }
  }

  return SUCCESS;
}
