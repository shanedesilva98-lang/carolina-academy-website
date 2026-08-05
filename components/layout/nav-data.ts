export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const coursesMenu: NavLink[] = [
  { label: "All Courses", href: "/courses", description: "Browse every vocational programme" },
  { label: "Hospitality", href: "/courses/hospitality", description: "Pastry, service, housekeeping and cookery" },
  { label: "Pastry & Bakery", href: "/courses/pastry-bakery-nvq-level-3-4", description: "NVQ Level 3/4 flagship programme" },
  { label: "Food & Beverage Service", href: "/courses/hospitality#food-beverage-service", description: "Front-of-house service skills" },
  { label: "Housekeeping", href: "/courses/hospitality#housekeeping", description: "Hotel housekeeping standards" },
  { label: "Technology", href: "/courses/technology", description: "Welding and technical trades" },
  { label: "Welding", href: "/courses/technology#welding", description: "Arc, gas, MIG and TIG welding" },
  { label: "Health Sciences", href: "/courses/health-sciences", description: "Caregiver and nurse assistant training" },
  { label: "Upcoming Programmes", href: "/courses?status=upcoming", description: "Programmes in development" },
];

export const studyAbroadMenu: NavLink[] = [
  { label: "Study Abroad Overview", href: "/study-abroad", description: "How Carolina Academy supports your journey" },
  { label: "Study in South Korea", href: "/study-abroad/south-korea", description: "Degrees, language pathways and more" },
  { label: "Universities", href: "/study-abroad/south-korea#universities", description: "Partner and information institutions" },
  { label: "Undergraduate Programmes", href: "/study-abroad/south-korea#undergraduate", description: "Bachelor's degree pathways" },
  { label: "Korean Language Programmes", href: "/study-abroad/south-korea#korean-language", description: "Language-to-degree pathway" },
  { label: "Visa Guidance", href: "/study-abroad/south-korea/visa-guidance", description: "D-2 / D-4 visa information" },
  { label: "Application Process", href: "/study-abroad/application-process", description: "Step-by-step process" },
  { label: "Costs and Financial Preparation", href: "/study-abroad/south-korea#costs", description: "Tuition and living-cost guidance" },
  { label: "Student Resources", href: "/resources", description: "Checklists and guides" },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "South Korea", href: "/study-abroad/south-korea" },
  { label: "Student Resources", href: "/resources" },
  { label: "News & Events", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const footerExplore: NavLink[] = [
  { label: "About Carolina Academy", href: "/about" },
  { label: "All Courses", href: "/courses" },
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "Study in South Korea", href: "/study-abroad/south-korea" },
  { label: "Facilities", href: "/facilities" },
  { label: "Student Stories", href: "/student-stories" },
  { label: "News & Events", href: "/news" },
];

export const footerSupport: NavLink[] = [
  { label: "Student Resources", href: "/resources" },
  { label: "Application Process", href: "/study-abroad/application-process" },
  { label: "Visa Guidance", href: "/study-abroad/south-korea/visa-guidance" },
  { label: "Apply Now", href: "/apply" },
  { label: "Contact Us", href: "/contact" },
  { label: "Hospitality Training Center — Chilaw", href: "/locations/chilaw" },
  { label: "Study Abroad Office — Katunayake", href: "/locations/katunayake" },
];

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
