import "server-only";
import type { LeadFormPayload, LeadSubmissionResult } from "@/types/form";

/**
 * Lead-delivery provider abstraction.
 *
 * Server-only module — never import this from a Client Component. API routes
 * (app/api/contact/route.ts, app/api/applications/route.ts) call
 * `submitLead()`, which currently uses the mock handler below and logs the
 * submission server-side.
 *
 * To go live, implement one (or more) of the provider functions and switch
 * the `activeProvider` used inside `submitLead`. Suggested providers:
 * Resend, SendGrid, Brevo, Google Sheets webhook, CRM webhook, Supabase.
 * Required env vars for each are documented in .env.example.
 */

function adminNotificationEmail(payload: LeadFormPayload): { subject: string; html: string } {
  const kindLabel: Record<LeadFormPayload["kind"], string> = {
    contact: "New Contact Enquiry",
    "course-application": "New Course Application",
    "study-abroad-eligibility": "New Study Abroad Eligibility Submission",
    consultation: "New Consultation Booking",
  };

  return {
    subject: `Carolina Academy website: ${kindLabel[payload.kind]}`,
    html: `
      <h2>${kindLabel[payload.kind]}</h2>
      <p>A new submission was received on carolinaacademy.lk.</p>
      <pre style="font-family: monospace; background:#EAF2FF; padding:16px; border-radius:8px;">${escapeHtml(
        JSON.stringify(payload.data, null, 2)
      )}</pre>
      <p>Reply directly to the applicant using the contact details above.</p>
    `,
  };
}

function studentConfirmationEmail(payload: LeadFormPayload): { subject: string; html: string } | null {
  const name = "fullName" in payload.data ? payload.data.fullName : undefined;
  if (!name) return null;

  return {
    subject: "Thank you for contacting Carolina Academy",
    html: `
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for reaching out to Carolina Academy. We have received your submission and a member of our team
      will contact you shortly, usually within 1–2 working days (Monday to Saturday, 10:00 AM – 5:30 PM).</p>
      <p>If your enquiry is urgent, you can call +94 77 395 2316 or message us on WhatsApp.</p>
      <p>Warm regards,<br/>Carolina Academy<br/>Hospitality Training Center — Slot A1, Carolina Beach Resort, Ambakandawila Road, Chilaw, Sri Lanka<br/>Study Abroad Office — 1665/A, 1st Floor, Colombo Road, Kurana, Katunayake, Sri Lanka</p>
    `,
  };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Mock provider: logs to the server console. Safe default with no external calls. */
async function sendViaMock(payload: LeadFormPayload): Promise<void> {
  const admin = adminNotificationEmail(payload);
  const student = studentConfirmationEmail(payload);
  console.info("[lead:mock] admin notification ->", admin.subject);
  if (student) {
    console.info("[lead:mock] student confirmation ->", student.subject);
  }
}

/**
 * Example Resend implementation (not active by default).
 * Uncomment and set RESEND_API_KEY to enable.
 */
// async function sendViaResend(payload: LeadFormPayload): Promise<void> {
//   const { Resend } = await import("resend");
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   const admin = adminNotificationEmail(payload);
//   await resend.emails.send({
//     from: "Carolina Academy Website <no-reply@carolinaacademy.lk>",
//     to: process.env.ADMIN_NOTIFICATION_EMAIL || "info@carolinaacademy.lk",
//     subject: admin.subject,
//     html: admin.html,
//   });
//   const student = studentConfirmationEmail(payload);
//   const studentEmail = "email" in payload.data ? payload.data.email : undefined;
//   if (student && studentEmail) {
//     await resend.emails.send({
//       from: "Carolina Academy <no-reply@carolinaacademy.lk>",
//       to: studentEmail,
//       subject: student.subject,
//       html: student.html,
//     });
//   }
// }

export async function submitLead(payload: LeadFormPayload): Promise<LeadSubmissionResult> {
  try {
    await sendViaMock(payload);
    return {
      success: true,
      message: "Thank you — your submission has been received. Our team will contact you shortly.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while sending your submission. Please try again or contact us directly.",
    };
  }
}
