import { organisation, locations, type OrganisationLocation } from "@/content/organisation";
import { absoluteUrl } from "@/lib/utils";
import type { Course } from "@/types/course";
import type { Article, EventItem } from "@/types/article";
import type { FAQ } from "@/types/faq";

/**
 * Reusable JSON-LD builders. Each function returns a plain object ready to be
 * serialised into a <script type="application/ld+json"> tag via the
 * <SchemaMarkup /> component (components/seo/SchemaMarkup.tsx).
 *
 * Required schema types covered: EducationalOrganization, Organization,
 * WebSite, WebPage, Course, CourseInstance, BreadcrumbList, Article,
 * BlogPosting, Event, FAQPage, Person, VideoObject, ImageObject,
 * ContactPoint, PostalAddress.
 */

export function postalAddressSchema() {
  return {
    "@type": "PostalAddress",
    streetAddress: `${organisation.address.slot}, ${organisation.address.venue}, ${organisation.address.street}`,
    addressLocality: organisation.address.city,
    addressCountry: organisation.address.countryCode,
  };
}

/** PostalAddress for a specific Carolina Academy location (see content/organisation.ts). */
export function postalAddressSchemaFor(location: OrganisationLocation) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    addressLocality: location.city,
    addressCountry: location.countryCode,
  };
}

export function contactPointSchema() {
  return {
    "@type": "ContactPoint",
    telephone: organisation.telephone,
    email: organisation.email,
    contactType: "customer service",
    areaServed: "LK",
    availableLanguage: ["English", "Sinhala", "Tamil"],
  };
}

/** Both Carolina Academy locations, represented as schema.org Place entries. */
function organisationLocationsSchema() {
  return locations.map((location) => ({
    "@type": "Place",
    name: `${organisation.name} — ${location.name}`,
    address: postalAddressSchemaFor(location),
  }));
}

export function educationalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: organisation.name,
    url: organisation.url,
    description: organisation.legalDescription,
    foundingDate: organisation.foundingDate,
    telephone: organisation.telephone,
    email: organisation.email,
    address: postalAddressSchema(),
    location: organisationLocationsSchema(),
    contactPoint: [contactPointSchema()],
    ...(organisation.sameAs.length > 0 ? { sameAs: organisation.sameAs } : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: organisation.name,
    url: organisation.url,
    logo: absoluteUrl("/logos/carolina-academy-icon.png"),
    address: postalAddressSchema(),
    location: organisationLocationsSchema(),
    contactPoint: [contactPointSchema()],
    ...(organisation.sameAs.length > 0 ? { sameAs: organisation.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: organisation.url,
    name: organisation.name,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: `${organisation.url}/courses?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema(opts: { path: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${opts.path}#webpage`),
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function courseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": absoluteUrl(`/courses/${course.slug}#course`),
    name: course.title,
    description: course.overview,
    provider: {
      "@type": "EducationalOrganization",
      name: organisation.name,
      sameAs: organisation.url,
    },
    ...(course.courseCode ? { courseCode: course.courseCode } : {}),
    hasCourseInstance: courseInstanceSchema(course),
  };
}

export function courseInstanceSchema(course: Course) {
  return {
    "@type": "CourseInstance",
    courseMode: course.deliveryType === "on-campus" ? "onsite" : "blended",
    location: {
      "@type": "Place",
      name: course.trainingVenue,
      address: postalAddressSchema(),
    },
    ...(course.duration !== "[REQUIRES CONFIRMATION]" ? { courseWorkload: course.duration } : {}),
  };
}

export function faqPageSchema(items: FAQ[] | { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(article: Article, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`${path}#article`),
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.featuredImage.src),
    author: { "@type": "Person", name: article.author },
    ...(article.reviewer ? { reviewedBy: { "@type": "Person", name: article.reviewer } } : {}),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function blogPostingSchema(article: Article, path: string) {
  return { ...articleSchema(article, path), "@type": "BlogPosting" };
}

export function eventSchema(event: EventItem, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": absoluteUrl(`${path}#event`),
    name: event.title,
    description: event.excerpt,
    startDate: event.eventDate,
    ...(event.eventEndDate ? { endDate: event.eventEndDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: postalAddressSchema(),
    },
    image: absoluteUrl(event.featuredImage.src),
    organizer: { "@id": absoluteUrl("/#organization") },
  };
}

export function personSchema(person: { name: string; role: string; bio?: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    ...(person.bio ? { description: person.bio } : {}),
    ...(person.image ? { image: absoluteUrl(person.image) } : {}),
    worksFor: { "@id": absoluteUrl("/#organization") },
  };
}

export function videoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: absoluteUrl(video.thumbnailUrl),
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
  };
}

export function imageObjectSchema(image: { url: string; caption: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: absoluteUrl(image.url),
    caption: image.caption,
  };
}

/** LocalBusiness (+ EducationalOrganization for the primary/TVEC-registered site) schema for a location page. */
export function localBusinessSchema(location: OrganisationLocation = locations[0]) {
  return {
    "@context": "https://schema.org",
    "@type": location.isPrimary ? ["EducationalOrganization", "LocalBusiness"] : ["LocalBusiness"],
    "@id": absoluteUrl(`/locations/${location.slug}#localbusiness`),
    name: `${organisation.name} — ${location.name}`,
    url: absoluteUrl(`/locations/${location.slug}`),
    telephone: location.telephone,
    email: location.email,
    address: postalAddressSchemaFor(location),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: location.openingHours.schemaDays,
      opens: location.openingHours.schemaOpens,
      closes: location.openingHours.schemaCloses,
    },
    ...(location.isPrimary ? {} : { branchOf: { "@id": absoluteUrl("/#organization") } }),
  };
}
