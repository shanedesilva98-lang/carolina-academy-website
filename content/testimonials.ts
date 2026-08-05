import type { Testimonial } from "@/types/testimonial";

/**
 * Sample testimonial content.
 *
 * No real, verified student testimonials were supplied for this build. Every
 * entry below is clearly marked as sample content and must be replaced with
 * genuine, consented student stories before publishing the Student Stories
 * page live. Do not remove the "sample content" labelling in the UI when
 * rendering these entries.
 */

export const testimonials: Testimonial[] = [
  {
    id: "sample-testimonial-1",
    studentName: "Sample Student Name",
    programme: "Pastry & Bakery NVQ Level 3/4",
    intake: "[REQUIRES CONFIRMATION]",
    outcome: "Sample outcome text — replace with a verified, consented student story before publishing.",
    photo: { src: "/images/student-consultation.svg", alt: "Placeholder photograph for sample testimonial" },
    quote:
      "This is placeholder sample content illustrating how a student testimonial will appear. It must be replaced with a real, consented quote before this page goes live.",
    consentStatus: "sample-content",
    verified: false,
  },
  {
    id: "sample-testimonial-2",
    studentName: "Sample Student Name",
    programme: "Study in South Korea — University Degree Pathway",
    intake: "[REQUIRES CONFIRMATION]",
    outcome: "Sample outcome text — replace with a verified, consented student story before publishing.",
    photo: { src: "/images/student-consultation.svg", alt: "Placeholder photograph for sample testimonial" },
    quote:
      "This is placeholder sample content illustrating how a study-abroad student testimonial will appear. It must be replaced with a real, consented quote before this page goes live.",
    consentStatus: "sample-content",
    verified: false,
  },
];
