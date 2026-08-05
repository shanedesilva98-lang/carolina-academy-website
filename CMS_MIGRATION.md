# CMS Migration Guide

This project currently stores all content in typed TypeScript files under [`content/`](content/). This was a
deliberate choice for the first version — it needs no external service, keeps content type-safe, and ships with
zero runtime dependencies. When Carolina Academy is ready to let non-developers edit content directly, the
models below map cleanly onto a headless CMS.

## Why TypeScript content files first?

- **Type safety** — every content shape is defined in [`types/`](types/) and checked at build time.
- **Zero setup** — no database, no API keys, no hosting for a CMS.
- **Fast** — content is inlined at build time; no extra network requests.
- **Easy migration path** — each file exports a typed array with a stable shape, which maps 1:1 onto CMS
  collections/content types.

## Recommended headless CMS options

| CMS | Good fit because |
|---|---|
| **Sanity** | Flexible schema, excellent image pipeline, generous free tier, strong Next.js integration (`next-sanity`). |
| **Payload CMS** | Self-hosted, TypeScript-native, schema defined in code (closest to the current approach). |
| **Directus** | Works on top of an existing SQL database, good if Carolina Academy wants full data ownership. |
| **Strapi** | Widely used, large plugin ecosystem, self-hosted or Strapi Cloud. |

Any of these work; the mapping below is CMS-agnostic.

## Content model mapping

### Course (`content/courses.ts` → `types/course.ts`)

| Field | CMS field type |
|---|---|
| `slug` | Slug (unique, matches route `/courses/[slug]`) |
| `title`, `shortTitle` | Short text |
| `category` | Select (enum: hospitality, pastry-bakery, food-beverage-service, housekeeping, technology, welding, health-sciences) |
| `status` | Select (enum: active, upcoming, under-development) — **never let this default to "active"** |
| `qualification`, `qualificationLabel` | Select + short text |
| `accreditation` | Object `{ body, note }` |
| `courseCode` | Short text (optional) |
| `duration`, `schedule`, `medium`, `fee`, `nextIntake` | Short text — allow `"[REQUIRES CONFIRMATION]"` as a valid value, or better, model as nullable with a boolean `isConfirmed` flag |
| `instalments` | Array of `{ label, amount }` objects |
| `overview` | Rich text / long text |
| `audience`, `entryRequirements`, `careerOutcomes` | Array of short text |
| `curriculum` | Array of `{ category, topics: string[] }` |
| `faqs` | Array of `{ question, answer }`, or reference to a shared FAQ collection |
| `featuredImage`, `gallery` | Image / array of images with alt text (required field) |
| `updatedAt` | Date — drive the "Last Updated" label directly from this |

### University (`content/universities.ts` → `types/university.ts`)

Maps directly to a `University` collection. Keep `relationshipStatus` and `lastVerifiedAt` as **required** fields
with no default other than `information-only` / `null` — this prevents an editor from accidentally publishing an
unverified partnership as confirmed.

### Article / EventItem (`content/articles.ts`, `content/events.ts` → `types/article.ts`)

Standard blog/event collections. Most CMSs have a native "blog post" or "event" content type close to this
shape already. Keep `sources` (citations) and `reviewer` as first-class fields — they matter for AEO/GEO.

### Testimonial, TeamMember (`content/testimonials.ts`, `content/team.ts` → `types/testimonial.ts`)

Keep `consentStatus` and `verified` as required fields on the Testimonial model. Do not let the CMS default
these to "verified" — require an explicit editor action (e.g. uploading a signed consent document) before a
testimonial can be marked verified.

### FAQ (`content/faqs.ts` → `types/faq.ts`)

Simple `{ question, answer, topic }` collection. Consider a many-to-many relation between FAQs and Courses so
the same FAQ can be reused across multiple course pages.

### Organisation (`content/organisation.ts`)

This is a **singleton** — model it as a single "Settings" document, not a collection. Every schema/NAP field
(name, address, phone, email, hours, TVEC registration) reads from here so it never drifts across pages.

## Migration steps (high level)

1. Choose a CMS and define collections matching the tables above.
2. Write a one-off script that reads each `content/*.ts` array and creates matching CMS entries via the CMS's
   API/SDK.
3. Replace each `content/*.ts` file's static export with a `fetch`/SDK call, keeping the same exported function
   names (`getCourseBySlug`, `getFaqsByTopic`, etc.) so page components don't need to change.
4. Add ISR (`revalidate`) or on-demand revalidation (webhook from the CMS) so content updates go live without a
   full redeploy.
5. Keep the TypeScript types in `types/` as the source of truth for validation, even after migrating — most CMS
   SDKs can generate types from your schema, or you can validate CMS responses against these types with Zod.

## What should NOT move to a CMS without extra safeguards

- `status` fields on courses/universities (active/upcoming/confirmed) — add an approval workflow so marketing
  copy can't silently override verified facts.
- Legal page content (privacy policy, terms, disclaimer) — keep behind a review/approval step tied to actual
  legal sign-off, not a simple "publish" button.
