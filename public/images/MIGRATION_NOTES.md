# Image Migration Notes

All images currently in this project are **generated placeholder SVGs** (navy/gold Carolina Academy branding
with a descriptive label). None are hotlinked from the old carolinaacademy.lk site, per the build brief. Before
launch, replace each placeholder with a real, licensed photograph.

## Images to source, optimise and legally review

| Placeholder file | Used on | What's needed |
|---|---|---|
| `hero-vocational-training.svg` | Homepage hero | Photo of a student in practical vocational training or a consultation session |
| `pastry-bakery-training.svg` | Pastry & Bakery course, homepage | Student practising pastry/bakery techniques |
| `training-kitchen.svg` | Facilities, About, homepage | Training kitchen interior |
| `carolina-beach-resort.svg` | Facilities, Pastry course, About | Carolina Beach Resort exterior/hospitality setting |
| `hospitality-training.svg` | Hospitality hub, homepage | General hospitality practical training |
| `food-beverage-service.svg`, `housekeeping-training.svg`, `steward-training.svg`, `international-cookery.svg`, `national-cookery.svg` | Hospitality faculty cards | Programme-specific training photos (once each programme is active) |
| `welding-training.svg` | Technology faculty | Welding/technical training photo |
| `health-sciences-training.svg` | Health Sciences faculty | Caregiver/health-sciences training photo |
| `student-consultation.svg` | Study Abroad, homepage | Student in a one-on-one consultation |
| `south-korea-campus.svg` | South Korea page, homepage | Licensed South Korea university campus photo — **verify usage rights before publishing** |
| `south-korea-city.svg` | South Korea page | Licensed South Korea city/student-life photo — **verify usage rights** |
| `korean-language-training.svg` | Homepage featured programmes | Korean language class/materials photo |
| `classroom-facilities.svg`, `facilities-classroom.svg` | Facilities | Carolina Academy classroom |
| `trainer-student-interaction.svg` | About, homepage | Trainer working with a student |
| `graduation-achievement.svg` | Homepage, About | Graduation or achievement photo (only use with consent) |
| `facilities-kitchen.svg`, `facilities-consultation-area.svg`, `facilities-future.svg` | Facilities | Practical kitchen, consultation area, planned future facility renders |
| `about-overview.svg` | About hero | General institute overview photo |
| `og-default.svg` | Default Open Graph image | Branded 1200×630 social-share image |

## Logos

The real Carolina Academy logo has been supplied and is in use:

| File | Notes |
|---|---|
| `logos/carolina-academy-logo-full.png` | Official combined icon + wordmark, as supplied |
| `logos/carolina-academy-icon.png` | Icon mark, auto-cropped from the full logo — used in the header, footer, mobile menu, favicon and `Organization` JSON-LD |
| `logos/carolina-academy-wordmark.png` | Wordmark-only crop, available if a text-only lockup is needed |
| `logos/carolina-academy-logo.svg`, `logos/carolina-academy-mark.svg` | Superseded placeholder SVGs, no longer referenced — safe to delete |

If Carolina Academy can supply a native vector (SVG/AI/EPS) version of the logo, swap it in for crisper
rendering at large sizes and a smaller file size than the PNG crops above.

## Before publishing any real photo

1. Confirm Carolina Academy owns the rights or has a signed model/photo release, especially for photos
   featuring identifiable students.
2. Run images through `next/image` (already wired up throughout the codebase) — just point the `src` at the
   new file in `public/images/`.
3. Export as WebP or AVIF where possible; keep a JPEG fallback only if required.
4. Add accurate, descriptive `alt` text — every `<Image>` usage in this codebase already has an `alt` prop
   ready to be updated with real photo descriptions.
5. Re-run Lighthouse to confirm LCP stays under 2.5s after swapping in real (larger) photographs.
