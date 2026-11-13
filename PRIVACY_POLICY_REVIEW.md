# Privacy Policy — Review Pack (v2, 5 Nov 2026)

**Status: proposed, not approved, not deployed.** The proposed policy is `app/privacy-policy/page.tsx`
(local only, nothing committed or pushed). Preview: `npm run dev` then `/privacy-policy`.

Structure follows the Dundee and Durham prospective-student notices (separate enquiry/application handling from
marketing, controller, lawful use, sharing, retention, rights, complaints, cookies, contact). The British Council
page failed to load, so it was not used. No wording is copied.

## 1. Correction to the earlier audit

The earlier pack said form submissions "exist only in Vercel logs". That was wrong. `sendViaMock()` in
`lib/email.ts` logs only the email **subject**, never the applicant's data. The submission is **discarded**: it is
not stored, not emailed, not recoverable. Every website enquiry sent so far is lost. Existing behaviour does not
leak applicant data to logs, which is good and must be preserved.

## 2. Facts verified on 5 Nov 2026

| Fact | How verified |
|---|---|
| `/privacy-policy` is public, HTTP 200, no login, in sitemap, `robots` allows it, no noindex | live `curl`, `app/robots.ts`, `lib/metadata.ts` |
| Footer already links Privacy Policy | `footerLegal` in `components/layout/nav-data.ts` |
| Hosting is Vercel | response header `server: Vercel`, `.vercel/project.json` |
| Email is Zoho | MX records `mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com` |
| No Meta Pixel, GA4 or GTM on the live homepage or `/contact`; no `Set-Cookie` header | live HTML grep and headers. Re-check at publication |
| No Conversions API code anywhere | code search |
| No file upload on any form | code search |
| Website application form asks for date of birth, address and NIC/passport number | `lib/validation.ts` |
| Google Map embed on location pages | `components/shared/MapEmbed.tsx` |

## 3. Unresolved facts for management to confirm

The final policy was written to say only what is verified or is a plain commitment. These statements need a
manager to confirm they are true in practice, or tell me to change the wording:

1. Admissions staff contact people by phone, WhatsApp and email, and aim to reply in 1–2 working days (taken from the existing confirmation email).
2. Instant Form fields are limited to name, phone, email, optionally WhatsApp, education level, course/destination and intake; no NIC, passport or financial data.
3. Promotional marketing is sent only to people who opted in. Today there is **no opt-in checkbox anywhere**, so either no promotional marketing is sent, or it is sent without a recorded opt-in.
4. Access to enquiry records is limited to the staff who handle them.
5. Where lead details are stored after they reach you (email inbox, spreadsheet, Meta Leads Center). The policy says "records", not a specific tool.
6. Whether any Meta Pixel / Google tag has been added outside this codebase (for example in Meta Events Manager, Google Tag Manager, or a Vercel environment variable). Section 9 states none is in use.
7. Legal basis wording in section 4 and the rights, complaint and Data Protection Authority wording in section 12, which counsel should confirm. The page says it is "guided by" the Personal Data Protection Act, No. 9 of 2022 and does not claim compliance.

Optional additions that need facts I do not have (not included, so none are asserted): company registration number,
registered office, named privacy contact or DPO, specific retention periods, security certifications.

## 4. Website changes required

**Must have before the policy goes live** (it says forms are emailed to staff and that forms link here):

1. **Real enquiry delivery** (section 5 below). Needs your approval.
2. **Privacy Policy link on every form.**
   - `ConsentField` in `components/forms/FormPrimitives.tsx` (used by Contact, Course Application, Study-Abroad Eligibility, Consultation): make "Privacy Policy" a link.
   - `components/forms/LeadForm.tsx` (homepage "Request a Free Consultation"): it has **no checkbox**, sends `consent: true` automatically, and its note has no link. Add a visible Privacy Policy link and replace "you agree" with plain notice wording.
3. **Cookie Policy** (`app/cookie-policy/page.tsx`): remove the "placeholder" box and the `.env` variable names; state that no analytics or advertising cookies are used today, and mention the Google Map embed. Keep the commitment to update before enabling tools.
4. **Separate marketing choice**: add an optional, unticked "I'd also like news about courses and intakes" checkbox to the four full forms (and an optional question on the Meta Instant Form). Requires a schema field and inclusion in the staff email.

**Recommended:**

5. Data minimisation: the first-stage application form asks for NIC/passport number and date of birth. Consider asking for these only when admission is confirmed.
6. Meta Instant Form disclaimer and privacy link: set the form's Privacy policy link to `https://carolinaacademy.lk/privacy-policy`.
   Suggested custom disclaimer: "By submitting, you agree that Carolina Academy (Pvt) Ltd may contact you about your enquiry using the details you provide. See our Privacy Policy. Do not include NIC, passport or financial details."

## 5. Proposed secure delivery method (not implemented)

Recommended: **send over SMTP through the existing Zoho Mail account** using a dedicated mailbox, so no new vendor sees applicant data (Zoho already hosts `info@`).

- Add `nodemailer`; implement `sendViaSmtp()` in `lib/email.ts` and make it the active provider. Keep the mock only when `NODE_ENV=development`.
- New Vercel env vars (server-only, never `NEXT_PUBLIC_`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (a Zoho app-specific password), `ADMIN_NOTIFICATION_EMAIL`. Create a dedicated sender (for example `leads@carolinaacademy.lk`) so the password is not the main inbox's.
- **Do not log payloads.** Log only the form kind and success/failure.
- **Fail honestly:** if sending fails, the route returns the existing 500 and the form shows its error message. Never report success without a send.
- Remove the pretty-printed JSON dump of the whole payload in the admin email; send a formatted summary. Consider leaving out NIC/passport and date of birth from email text, or send them only in the staff copy.
- The quick callback form submits `not-provided@carolinaacademy.lk` as the email; skip the applicant confirmation email for that placeholder, otherwise it is sent to a made-up address on our own domain.
- Test on a Vercel **Preview** deployment with a test recipient before touching Production, and send one real test through each of the five forms.
- Alternative: Resend or Brevo (new processor, would need the policy to name it, and DNS records on a subdomain so the Zoho MX stays untouched). Email alone is also not a durable record, so a later CRM remains worthwhile.
- Zoho is a US-hosted service by its MX domain (`zoho.com`), so mail stays described as "outside Sri Lanka" in the policy.

## 6. Remaining legal and privacy risks

1. **Lost leads** until delivery is fixed. The site tells visitors "we'll call you back" when nothing is sent. Meta Ads should not be switched on before this is fixed.
2. **Implied consent on the quick form**: `consent: true` is hard-coded. Not a recorded opt-in.
3. **NIC/passport and date of birth** collected in plain form fields and later emailed. Sensitive identity data, no upload and no encryption beyond TLS.
4. **No consent record for marketing** and no way to opt out beyond emailing.
5. **Counsel has not confirmed** which PDPA No. 9 of 2022 provisions apply, the lawful bases, cross-border transfer rules (Vercel, Zoho, Meta, overseas universities), or the Data Protection Authority's current status.
6. **No retention periods** are stated. The policy states criteria only. A schedule is advisable.
7. **Minors**: no age gate or parental-consent flow exists.
8. **No DPO, breach procedure or processor contracts** are claimed, and none are verified.
9. The policy must be kept in step with reality: if a Pixel, GA4, CRM, LMS or Conversions API goes live, update it first.

## 7. Plan after approval

1. Implement items 1–4 above and the delivery fix on a branch; preview deployment and test; show you the results.
2. On your go-ahead: merge, deploy, then verify the live URL (HTTP 200, no login, desktop and mobile rendering, no placeholders or draft text, footer and form links, Meta Instant Form link).
3. Set `LastUpdated` to the actual publication date at deploy time.

---

# v3 — Implementation results (13 Nov 2026, branch `feature/enquiry-delivery-privacy`)

Implemented and tested locally against a mock SMTP server (STARTTLS, auth required). **Not deployed to production.**

- `lib/email.ts`: real SMTP delivery. Success is reported only after the staff email is accepted. Failures return HTTP 500 and the form shows its error.
- `lib/lead-email.ts`: email formatting. NIC/passport are never written to an email (and the website form no longer asks for them). Static subjects, escaped HTML, single-line headers.
- Optional, unticked marketing checkbox on the four full forms; a separate `[Marketing opt-in]` email records name, contact details, UTC time, policy version and exact wording. The staff email also states the choice.
- Privacy Policy link on all five forms (new tab); quick callback form has notice text and link.
- Cookie Policy rewritten to match reality (no analytics/advertising cookies; Google Map embed). Privacy Policy text updated to match.
- No Meta Pixel, GA4, GTM or Conversions API was activated.

| Test | Result |
|---|---|
| Contact, application (with marketing), eligibility (no marketing), consultation (with marketing) | 200; staff email sent; applicant confirmation sent; opt-in record only when ticked |
| Quick callback with placeholder email | 200; no confirmation sent to the made-up address |
| Consent unticked | 400, nothing sent |
| NIC sent by a client anyway | stripped; not in any email |
| Header-injection attempt in name | no extra recipients; value flattened to one line |
| HTML in message | escaped in HTML email |
| SMTP server down | 500, honest error, log shows `code=ESOCKET`, no applicant data |
| Wrong SMTP password | 500, log shows `code=EAUTH`, no password or applicant data |
| Production build with no SMTP settings | 500, log says "NOT delivered", no applicant data |
| `tsc`, `eslint`, `next build` | pass |

Not tested: delivery to real Zoho (needs your credentials), and clicking through the forms in a browser (Chrome extension was not connected). Test on the Vercel Preview once the SMTP variables are set.
