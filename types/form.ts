/**
 * Shared form types and the lead-delivery provider abstraction.
 * See lib/email.ts for the implementation and README.md "Email provider setup".
 */

export type EnquiryType =
  | "course-application"
  | "study-abroad-consultation"
  | "general-enquiry"
  | "brochure-request"
  | "partnership-enquiry";

export type PreferredContactMethod = "phone" | "whatsapp" | "email";

export interface ContactFormValues {
  fullName: string;
  email: string;
  telephone: string;
  whatsappNumber?: string;
  enquiryType: EnquiryType;
  courseOrDestination?: string;
  preferredContactMethod: PreferredContactMethod;
  message: string;
  consent: boolean;
  /** Honeypot field — must stay empty. Bots that auto-fill every field get caught here. */
  companyWebsite?: string;
}

export interface CourseApplicationFormValues {
  fullName: string;
  dateOfBirth: string;
  nic: string;
  email: string;
  telephone: string;
  whatsappNumber?: string;
  address: string;
  courseSlug: string;
  highestEducation: string;
  preferredIntake?: string;
  message?: string;
  consent: boolean;
  companyWebsite?: string;
}

export interface StudyAbroadEligibilityFormValues {
  fullName: string;
  email: string;
  telephone: string;
  whatsappNumber?: string;
  destination: string;
  pathway: string;
  highestEducation: string;
  englishProficiency: string;
  koreanProficiency?: string;
  intendedIntake?: string;
  message?: string;
  consent: boolean;
  companyWebsite?: string;
}

export interface ConsultationFormValues {
  fullName: string;
  email: string;
  telephone: string;
  whatsappNumber?: string;
  consultationType: "vocational-course" | "study-abroad" | "not-sure";
  preferredDate?: string;
  preferredContactMethod: PreferredContactMethod;
  message?: string;
  consent: boolean;
  companyWebsite?: string;
}

export type LeadFormKind =
  | "contact"
  | "course-application"
  | "study-abroad-eligibility"
  | "consultation";

export type LeadFormPayload =
  | { kind: "contact"; data: ContactFormValues }
  | { kind: "course-application"; data: CourseApplicationFormValues }
  | { kind: "study-abroad-eligibility"; data: StudyAbroadEligibilityFormValues }
  | { kind: "consultation"; data: ConsultationFormValues };

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
}
