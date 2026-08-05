import { z } from "zod";

/** Shared field validators */
const fullName = z.string().trim().min(2, "Please enter your full name.").max(120);
const email = z.string().trim().email("Please enter a valid email address.");
const telephone = z
  .string()
  .trim()
  .min(7, "Please enter a valid telephone number.")
  .max(20)
  .regex(/^[0-9+\s()-]+$/, "Please enter a valid telephone number.");
const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .regex(/^[0-9+\s()-]*$/, "Please enter a valid phone number.")
  .optional()
  .or(z.literal(""));
const consent = z.literal(true, {
  errorMap: () => ({ message: "Please confirm you agree before submitting." }),
});
/** Honeypot: must always be empty. Real users never see or fill this field. */
const honeypot = z.string().max(0, "Submission rejected.").optional().or(z.literal(""));

export const contactFormSchema = z.object({
  fullName,
  email,
  telephone,
  whatsappNumber: optionalPhone,
  enquiryType: z.enum([
    "course-application",
    "study-abroad-consultation",
    "general-enquiry",
    "brochure-request",
    "partnership-enquiry",
  ]),
  courseOrDestination: z.string().trim().max(200).optional().or(z.literal("")),
  preferredContactMethod: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().trim().min(10, "Please add a short message (at least 10 characters).").max(2000),
  consent,
  companyWebsite: honeypot,
});
export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const courseApplicationFormSchema = z.object({
  fullName,
  dateOfBirth: z.string().trim().min(1, "Please provide your date of birth."),
  nic: z.string().trim().min(5, "Please enter a valid NIC or passport number.").max(20),
  email,
  telephone,
  whatsappNumber: optionalPhone,
  address: z.string().trim().min(5, "Please enter your address.").max(300),
  courseSlug: z.string().trim().min(1, "Please select a course."),
  highestEducation: z.string().trim().min(2, "Please enter your highest education level.").max(200),
  preferredIntake: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  companyWebsite: honeypot,
});
export type CourseApplicationFormSchema = z.infer<typeof courseApplicationFormSchema>;

export const studyAbroadEligibilityFormSchema = z.object({
  fullName,
  email,
  telephone,
  whatsappNumber: optionalPhone,
  destination: z.string().trim().min(1, "Please select a destination."),
  pathway: z.string().trim().min(1, "Please select a pathway."),
  highestEducation: z.string().trim().min(2, "Please enter your highest education level.").max(200),
  englishProficiency: z.string().trim().min(1, "Please select an option."),
  koreanProficiency: z.string().trim().max(100).optional().or(z.literal("")),
  intendedIntake: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  companyWebsite: honeypot,
});
export type StudyAbroadEligibilityFormSchema = z.infer<typeof studyAbroadEligibilityFormSchema>;

export const consultationFormSchema = z.object({
  fullName,
  email,
  telephone,
  whatsappNumber: optionalPhone,
  consultationType: z.enum(["vocational-course", "study-abroad", "not-sure"]),
  preferredDate: z.string().trim().max(100).optional().or(z.literal("")),
  preferredContactMethod: z.enum(["phone", "whatsapp", "email"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  companyWebsite: honeypot,
});
export type ConsultationFormSchema = z.infer<typeof consultationFormSchema>;
