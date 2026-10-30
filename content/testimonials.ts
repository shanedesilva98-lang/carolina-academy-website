import type { Testimonial } from "@/types/testimonial";

/**
 * Student stories.
 *
 * Both stories were supplied by Carolina Academy, which confirmed they should
 * be shown without a draft label. Keep each student's written approval on file.
 */

export const testimonials: Testimonial[] = [
  {
    id: "chamuditha-nonis-pastry-bakery",
    studentName: "Chamuditha Nonis",
    programme: "Vocational Training — Pastry & Bakery",
    intake: "[REQUIRES CONFIRMATION]",
    outcome: "[REQUIRES CONFIRMATION]",
    quote:
      "Studying at Carolina Academy has given me the opportunity to develop my practical skills in pastry and bakery. The guidance from the lecturers and hands-on training have helped me build confidence and prepare for a future career in the hospitality industry.",
    consentStatus: "consent-on-file",
    verified: true,
  },
  {
    id: "chaya-nethmini-south-korea",
    studentName: "Chaya Nethmini",
    programme: "Study Abroad — South Korea",
    intake: "[REQUIRES CONFIRMATION]",
    outcome: "[REQUIRES CONFIRMATION]",
    quote:
      "Carolina Academy has guided me throughout my study-abroad application journey, from understanding the available programmes to preparing the necessary documents. Their support and guidance have helped me approach the process with greater confidence and clarity.",
    consentStatus: "consent-on-file",
    verified: true,
  },
];
