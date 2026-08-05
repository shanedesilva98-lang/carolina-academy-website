# Carolina Academy — Website

Production-ready website for **Carolina Academy**, a TVEC-registered vocational training institute and
study-abroad consultancy based in Chilaw, Sri Lanka.

## 1. Project Overview

This site positions Carolina Academy around two service divisions:

1. **Vocational & Career Training** — competency-based, practical programmes (flagship: Pastry & Bakery NVQ
   Level 3/4), plus a growing Technology (welding) and Health Sciences faculty.
2. **Study Abroad** — application, documentation and pre-departure guidance, currently focused on South Korea.

Every programme and university entry is labelled honestly as **Active**, **Upcoming**, **Under Development**,
**Confirmed Partner** or **Information Only** — see [`content/`](content/) for the source data and
[`CMS_MIGRATION.md`](CMS_MIGRATION.md) for how this maps to a future headless CMS.

## 2. Technology Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS** with CSS-variable-driven design tokens (see `tailwind.config.ts`)
- **shadcn/ui**-style primitives in `components/ui/` (Radix UI under the hood)
- **Lucide React** icons
- **Framer Motion** for restrained scroll-triggered animation (`components/shared/FadeIn.tsx`)
- **React Hook Form + Zod** for every form, with a shared server-side validation layer
- **Next.js Metadata API** + hand-rolled JSON-LD builders (`lib/schema.ts`) for SEO/AEO/GEO
- **next/image** for all imagery (currently pointed at generated placeholder SVGs — see
  `public/images/MIGRATION_NOTES.md`)

## 3. Installation

Requires **Node.js 20.9+** and npm.

```bash
npm install
```

## 4. Development Commands

```bash
npm run dev        # start the dev server (Turbopack) at http://localhost:3000
npm run build       # production build
npm run start        # serve the production build
npm run lint          # ESLint (flat config, Next.js + TypeScript rules)
npm run typecheck      # tsc --noEmit
```

## 5. Environment Variables

Copy `.env.example` to `.env.local` and fill in real values before deploying:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain used for metadata, JSON-LD and the sitemap |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (leave empty to disable) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (leave empty to disable) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (leave empty to disable) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code |
| `CONTACT_EMAIL`, `ADMIN_NOTIFICATION_EMAIL` | Where admin lead notifications should go |
| `RESEND_API_KEY` / `SENDGRID_API_KEY` / `BREVO_API_KEY` | Pick **one** email provider — see §10 |
| `CRM_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Optional lead-delivery integrations |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number used to build `wa.me` links (public, no `+`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | "Embed a map" URL from Google Maps for the Contact/Chilaw pages |
| `FORM_RATE_LIMIT_WINDOW_MS`, `FORM_RATE_LIMIT_MAX_SUBMISSIONS` | In-memory API rate-limit tuning |

**Never** prefix a secret (API key, webhook URL with a token) with `NEXT_PUBLIC_` — that exposes it to the
browser. All secret env vars are only read in `lib/email.ts`, `lib/rate-limit.ts` and the `app/api/*/route.ts`
files, none of which ship to the client.

## 6. Content Editing

All editable content lives in [`content/`](content/) as typed TypeScript files — no rebuild-breaking magic
strings, everything is checked against the types in [`types/`](types/).

| File | Powers |
|---|---|
| `content/organisation.ts` | Name, address, phone, email, hours, TVEC registration, vision/mission/values — the single source of truth for NAP consistency |
| `content/courses.ts` | Every vocational course |
| `content/universities.ts` | South Korea partner/information universities |
| `content/articles.ts`, `content/events.ts` | News and events (both start empty — see §8) |
| `content/testimonials.ts`, `content/team.ts` | Sample testimonials and leadership/trainer placeholders |
| `content/faqs.ts` | Site-wide FAQ bank, filtered by `topic` on each page |

### Adding a course

1. Open `content/courses.ts`.
2. Copy an existing `Course` object as a template (the Pastry & Bakery entry is the most complete).
3. Set `status` honestly: `"active"` only if applications are genuinely open; otherwise `"upcoming"` or
   `"under-development"`.
4. Use the literal string `"[REQUIRES CONFIRMATION]"` for any field (`duration`, `fee`, `nextIntake`, etc.) that
   isn't confirmed yet — the UI renders this clearly rather than guessing.
5. If it needs its own full landing page (like Pastry & Bakery), create
   `app/courses/[slug]/page.tsx` following the pattern in
   `app/courses/pastry-bakery-nvq-level-3-4/page.tsx`. Otherwise it will still appear correctly in the
   `/courses` grid and on its faculty hub page via `getCourseBySlug`.
6. Add the course to `app/sitemap.ts` automatically happens — course entries are generated from
   `content/courses.ts`, no manual step needed.

### Adding a university

1. Open `content/universities.ts`.
2. Add a `University` object. **Do not** set `relationshipStatus: "confirmed-partner"` unless Carolina Academy
   has a verifiable written agreement — default to `"information-only"`.
3. Always set `lastVerifiedAt` to the date the information was actually checked, or `null` if never verified.

### Adding a news article

1. Open `content/articles.ts`.
2. Push an object matching the `Article` type (a full example is commented at the top of the file).
3. Articles automatically appear on `/news`, get their own `/news/[slug]` page, are included in
   `/news/rss.xml`, and are added to `app/sitemap.ts`.
4. Do **not** add placeholder/test articles — the brief explicitly requires no dummy content. Leave the array
   empty until real, dated content exists (the page renders a clean "no articles yet" state).

Events work identically via `content/events.ts` / `/events`.

## 7. Forms and Lead Handling

- Every form uses **React Hook Form** + a **Zod** schema from `lib/validation.ts`.
- Every form includes a honeypot field (`components/forms/FormPrimitives.tsx` → `<Honeypot />`) — bots that
  fill every input get silently rejected server-side.
- Submissions POST to `app/api/contact/route.ts` or `app/api/applications/route.ts`, which re-validate with
  the same Zod schema server-side, apply a simple in-memory rate limit (`lib/rate-limit.ts`), then call
  `submitLead()` in `lib/email.ts`.
- `lib/email.ts` is the **lead-delivery provider abstraction**. It currently uses a mock handler that logs to
  the server console and always returns success. Swap in a real provider by implementing one of the commented
  examples (Resend is stubbed out) and pointing `submitLead()` at it.

### Email provider setup

1. Pick a provider (Resend is recommended for simplicity) and get an API key.
2. Add the key to `.env.local` (e.g. `RESEND_API_KEY=...`).
3. In `lib/email.ts`, uncomment the `sendViaResend` example, `npm install resend`, and call it from
   `submitLead()` instead of `sendViaMock`.
4. The admin-notification and student-confirmation HTML templates are already written in `lib/email.ts` —
   adjust copy as needed.

## 8. Analytics Setup

Analytics scripts only load once their env var is set (see `app/layout.tsx`):

- Set `NEXT_PUBLIC_GA_ID` to enable Google Analytics 4.
- Set `NEXT_PUBLIC_GTM_ID` to enable Google Tag Manager.
- Set `NEXT_PUBLIC_META_PIXEL_ID` to enable the Meta Pixel.

All conversion-relevant interactions call `trackEvent()` from `lib/analytics.ts`, which pushes to
`dataLayer`, `gtag` and `fbq` simultaneously:

`course_application_started`, `course_application_completed`, `study_abroad_form_submitted`, `whatsapp_click`,
`telephone_click`, `email_click`, `brochure_download`, `consultation_booking`, `university_enquiry`,
`map_direction_click`.

Cookie consent: non-essential analytics/advertising scripts should sit behind a consent banner before going
live — see `app/cookie-policy/page.tsx` for the placeholder copy that describes this.

## 9. Deployment

Any Node.js host that supports Next.js 16 works (Vercel is the simplest):

```bash
npm run build
npm run start
```

1. Set all required env vars from `.env.example` in your hosting provider's dashboard.
2. Set `NEXT_PUBLIC_SITE_URL` to the real production domain (no trailing slash).
3. Point DNS at your host and confirm HTTPS is enforced.
4. Submit `/sitemap.xml` to Google Search Console once `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set and
   verified.

## 10. SEO Checklist

- [x] Unique `<title>` / meta description per route via `lib/metadata.ts` → `buildMetadata()`
- [x] Canonical URL on every page
- [x] Open Graph + Twitter card metadata on every page
- [x] `app/sitemap.ts` and `app/robots.ts`
- [x] JSON-LD: EducationalOrganization, Organization, WebSite, WebPage, Course, CourseInstance,
      BreadcrumbList, Article, BlogPosting, Event, FAQPage, Person, VideoObject, ImageObject, ContactPoint,
      PostalAddress (`lib/schema.ts`)
- [x] Breadcrumbs with matching `BreadcrumbList` schema on every non-home page
- [x] Semantic heading hierarchy (one `<h1>` per page, question-led `<h2>`s for AEO)
- [x] `noindex` on `/student-stories` (sample content only) — remove once real, consented stories are added
- [x] RSS feed at `/news/rss.xml`
- [x] Pagination on `/news`
- [ ] **You must do this**: submit the sitemap to Search Console and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## 11. Image Optimisation

All images render through `next/image` with explicit `sizes` and `fill`/width+height to avoid layout shift.
Current images are generated placeholder SVGs — see `public/images/MIGRATION_NOTES.md` for the full list of
real photographs still needed, with legal-review notes.

## 12. Accessibility Testing

Before launch, run:

```bash
npx @axe-core/cli http://localhost:3000
```

against each major route, and manually verify:

- Skip-to-content link (Tab on page load)
- Keyboard-only navigation through the header mega menu and mobile sheet menu
- Screen reader pass on the course application form (labels, error announcements via `role="alert"`)
- `prefers-reduced-motion` respected (global CSS override in `app/globals.css` + Framer Motion)
- Colour contrast — the palette in `tailwind.config.ts` was chosen for WCAG AA contrast on white/navy
  backgrounds; re-check if the palette changes

## 13. Production Launch Checklist

1. Replace every placeholder image (`public/images/MIGRATION_NOTES.md`) with real, rights-cleared photography.
2. Fill in every `[REQUIRES CONFIRMATION]` value across `content/courses.ts` (see the content-audit list below).
3. Replace sample testimonials in `content/testimonials.ts` with real, consented student stories, then remove
   `noindex` from `/student-stories`.
4. Confirm TVEC registration document upload on the About page's Accreditation section.
5. Set a real email provider in `lib/email.ts` (§7).
6. Set analytics env vars and add a cookie-consent banner before enabling non-essential scripts.
7. Set `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` for a live map.
8. Run `npm run build && npm run lint && npm run typecheck` — all must pass with zero errors.
9. Run Lighthouse on the homepage, a course page and the South Korea page — target LCP < 2.5s, INP < 200ms,
   CLS < 0.1.
10. Have legal counsel review `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/disclaimer`,
    `/cookie-policy` — all are marked as placeholders requiring review.

---

## Content Requiring Confirmation

The following are intentionally left as `"[REQUIRES CONFIRMATION]"` or placeholder content because no reliable
source was available at build time:

- Course duration, fee, instalment plan, next intake, schedule and medium for every course (most visibly on
  the Pastry & Bakery NVQ Level 3/4 page)
- Entry requirements detail for every course
- Trainer and leadership profiles (`content/team.ts`)
- South Korea partner universities (`content/universities.ts` — currently structural placeholders only)
- Social media links (`content/organisation.ts` → `sameAs: []`)
- TVEC accreditation supporting documents (About page Accreditation section)
- Student testimonials (`content/testimonials.ts` — sample content only, `/student-stories` is `noindex`)
- Nearby landmarks and directions detail on `/locations/chilaw`
- Legal page content (privacy policy, terms, refund policy, disclaimer, cookie policy) — professionally
  structured placeholders pending legal review

Do not remove the `[REQUIRES CONFIRMATION]` markers or the "Upcoming"/"Under Development" labelling without
first getting the underlying fact confirmed by Carolina Academy.
