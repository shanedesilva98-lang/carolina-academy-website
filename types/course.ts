/**
 * Course data model.
 * Mirrors the "Course" content model described in the project brief so it can
 * be migrated to a headless CMS later — see CMS_MIGRATION.md.
 */

export type CourseStatus = "active" | "upcoming" | "under-development";

export type CourseCategory =
  | "hospitality"
  | "pastry-bakery"
  | "food-beverage-service"
  | "housekeeping"
  | "technology"
  | "welding"
  | "health-sciences";

export type QualificationType =
  | "nvq"
  | "certificate"
  | "diploma"
  | "in-house"
  | "not-yet-confirmed";

export type DeliveryType = "on-campus" | "practical-placement" | "blended";

export interface CourseFAQItem {
  question: string;
  answer: string;
}

export interface CourseFeeInstalment {
  label: string;
  amount: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  status: CourseStatus;
  qualification: QualificationType;
  qualificationLabel: string;
  accreditation: {
    body: "TVEC" | "In-house" | "Not yet confirmed";
    note: string;
  };
  courseCode?: string;
  duration: string | "[REQUIRES CONFIRMATION]";
  schedule: string | "[REQUIRES CONFIRMATION]";
  medium: string | "[REQUIRES CONFIRMATION]";
  deliveryType: DeliveryType;
  location: string;
  fee: string | "[REQUIRES CONFIRMATION]";
  instalments: CourseFeeInstalment[] | "[REQUIRES CONFIRMATION]";
  nextIntake: string | "[REQUIRES CONFIRMATION]";
  overview: string;
  audience: string[];
  entryRequirements: string[];
  curriculum: { category: string; topics: string[] }[];
  curriculumNote: string;
  practicalTraining: string;
  trainingVenue: string;
  assessment: string;
  careerOutcomes: string[];
  faqs: CourseFAQItem[];
  featuredImage: {
    src: string;
    alt: string;
  };
  gallery: { src: string; alt: string }[];
  applicationUrl: string;
  whatsappMessage: string;
  updatedAt: string;
}
