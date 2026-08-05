/**
 * Single source of truth for Carolina Academy's organisational details.
 * Keep name, address and phone (NAP) perfectly consistent across the whole
 * site and structured data — this consistency matters for local SEO, AEO
 * and GEO (see lib/schema.ts).
 */

export const organisation = {
  name: "Carolina Academy",
  legalDescription:
    "Carolina Academy is a private vocational training institute and study-abroad consultancy in Sri Lanka. It began as a hospitality training institute and has expanded into technical and vocational education, career-focused training and international education consultancy.",
  foundingDate: "2023-03-07",
  url: "https://carolinaacademy.lk",
  // Primary/general-enquiry number — the Hospitality Training Center line
  // (also the TVEC-registered location). Shown in the header/announcement
  // bar and used as the main Organization schema `telephone`. Each
  // location's own number(s) are in `locations[].phones` below.
  telephone: "+94 77 383 1955",
  telephoneHref: "tel:+94773831955",
  // WhatsApp is answered from the Study Abroad Office mobile.
  whatsappNumber: "94716373334",
  email: "info@carolinaacademy.lk",
  emailHref: "mailto:info@carolinaacademy.lk",
  // Registered/primary address — mirrors locations[0] ("chilaw"). Kept as
  // flat fields here since lib/schema.ts's core Organization/
  // EducationalOrganization schema and a few legacy call sites read it
  // directly as the legal address.
  address: {
    slot: "Slot A1",
    venue: "Carolina Beach Resort",
    street: "Ambakandawila Road",
    city: "Chilaw",
    country: "Sri Lanka",
    countryCode: "LK",
    full: "Slot A1, Carolina Beach Resort, Ambakandawila Road, Chilaw, Sri Lanka",
  },
  openingHours: {
    days: "Monday to Saturday",
    hours: "10:00 AM to 5:30 PM",
    schemaOpens: "10:00",
    schemaCloses: "17:30",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  tvec: {
    label: "TVEC Registered Institution",
    registrationNumber: "P13/0095",
    displayText: "TVEC Registered Institution – Registration No. P13/0095",
  },
  vision:
    "To be an eminent private training institute providing a creative and competent workforce in technical and vocational disciplines for national and international industries.",
  mission:
    "To equip students with technical and vocational skills that meet national and international industry standards, while providing expert guidance to students who wish to pursue higher studies abroad.",
  values: [
    {
      title: "Practical Learning",
      description: "Training built around hands-on, competency-based practice rather than theory alone.",
    },
    {
      title: "Professional Excellence",
      description: "Encouraging students to meet recognised industry standards in every programme.",
    },
    {
      title: "Integrity",
      description: "Communicating honestly with students and parents about programmes, costs and outcomes.",
    },
    {
      title: "Student Success",
      description: "Supporting each student's individual progress toward their career or study-abroad goals.",
    },
    {
      title: "Global Outlook",
      description: "Preparing students for both national industry needs and international opportunities.",
    },
    {
      title: "Continuous Improvement",
      description: "Reviewing and refining programmes and services as the institute grows.",
    },
  ],
  // Populate once real, owned social profile URLs are supplied. Do not invent handles.
  sameAs: [] as string[],
};

/**
 * Carolina Academy operates from two physical locations. `isPrimary` marks
 * the TVEC-registered address used for the main Organization/
 * EducationalOrganization schema and legal correspondence; both locations
 * get their own /locations/[slug] page and LocalBusiness schema.
 */
export interface LocationPhone {
  label: string;
  number: string;
  href: string;
}

export interface OrganisationLocation {
  id: "chilaw" | "katunayake";
  slug: string;
  name: string;
  role: string;
  addressLines: string[];
  streetAddress: string;
  city: string;
  country: string;
  countryCode: string;
  full: string;
  /** Primary phone (first entry of `phones`) — used wherever a single number is needed (schema.org telephone, etc.). */
  telephone: string;
  telephoneHref: string;
  /** Every phone line for this location, in display order. Most locations have one; Katunayake has a mobile and a landline. */
  phones: LocationPhone[];
  email: string;
  emailHref: string;
  openingHours: typeof organisation.openingHours;
  isPrimary: boolean;
  mapsEmbedEnvVar: string;
}

export const locations: OrganisationLocation[] = [
  {
    id: "chilaw",
    slug: "chilaw",
    name: "Hospitality Training Center",
    role: "Practical training venue for hospitality, culinary and vocational programmes.",
    addressLines: ["Slot A1, Carolina Beach Resort", "Ambakandawila Road", "Chilaw, Sri Lanka"],
    streetAddress: "Slot A1, Carolina Beach Resort, Ambakandawila Road",
    city: "Chilaw",
    country: "Sri Lanka",
    countryCode: "LK",
    full: "Slot A1, Carolina Beach Resort, Ambakandawila Road, Chilaw, Sri Lanka",
    telephone: "+94 77 383 1955",
    telephoneHref: "tel:+94773831955",
    phones: [{ label: "Mobile", number: "+94 77 383 1955", href: "tel:+94773831955" }],
    email: "info@carolinaacademy.lk",
    emailHref: "mailto:info@carolinaacademy.lk",
    openingHours: {
      days: "Monday to Saturday",
      hours: "10:00 AM to 5:30 PM",
      schemaOpens: "10:00",
      schemaCloses: "17:30",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    isPrimary: true,
    mapsEmbedEnvVar: "NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL_CHILAW",
  },
  {
    id: "katunayake",
    slug: "katunayake",
    name: "Study Abroad Office",
    role: "Consultation office for university applications, study-abroad guidance and visa-document support.",
    addressLines: ["1665/A, 1st Floor", "Colombo Road, Kurana", "Katunayake, Sri Lanka"],
    streetAddress: "1665/A, 1st Floor, Colombo Road, Kurana",
    city: "Katunayake",
    country: "Sri Lanka",
    countryCode: "LK",
    full: "1665/A, 1st Floor, Colombo Road, Kurana, Katunayake, Sri Lanka",
    telephone: "+94 71 637 3334",
    telephoneHref: "tel:+94716373334",
    phones: [
      { label: "Mobile", number: "+94 71 637 3334", href: "tel:+94716373334" },
      { label: "Landline", number: "+94 31 222 6443", href: "tel:+94312226443" },
    ],
    email: "info@carolinaacademy.lk",
    emailHref: "mailto:info@carolinaacademy.lk",
    openingHours: {
      days: "Monday to Saturday",
      hours: "10:00 AM to 5:30 PM",
      schemaOpens: "10:00",
      schemaCloses: "17:30",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    isPrimary: false,
    mapsEmbedEnvVar: "NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL_KATUNAYAKE",
  },
];

export function getLocation(id: OrganisationLocation["id"]): OrganisationLocation {
  const location = locations.find((loc) => loc.id === id);
  if (!location) throw new Error(`Unknown location id: ${id}`);
  return location;
}

export const trustIndicators = [
  { label: "TVEC Registered Institution", detail: "Registration No. P13/0095" },
  { label: "Competency-Based Training", detail: "Practical, skills-first programme design" },
  { label: "Practical Industry Exposure", detail: "Hands-on training in a working hospitality environment" },
  { label: "Study-Abroad Guidance", detail: "Application and documentation support for South Korea" },
  { label: "Located at Carolina Beach Resort", detail: "Ambakandawila Road, Chilaw, Sri Lanka" },
];
