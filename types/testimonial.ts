export interface Testimonial {
  id: string;
  studentName: string;
  programme: string;
  intake: string;
  outcome: string;
  photo?: { src: string; alt: string };
  videoUrl?: string;
  quote: string;
  consentStatus: "consent-on-file" | "sample-content";
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: { src: string; alt: string };
  credentials?: string[];
}
