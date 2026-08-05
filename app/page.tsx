import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { PathwaysSection } from "@/components/sections/PathwaysSection";
import { FeaturedProgrammes } from "@/components/sections/FeaturedProgrammes";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PracticalTraining } from "@/components/sections/PracticalTraining";
import { SouthKoreaFeature } from "@/components/sections/SouthKoreaFeature";
import { ApplicationProcessSection } from "@/components/sections/ApplicationProcessSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { StudentSupportSection } from "@/components/sections/StudentSupportSection";
import { UpcomingIntakes } from "@/components/sections/UpcomingIntakes";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { ContactSection } from "@/components/sections/ContactSection";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Carolina Academy Sri Lanka | Vocational Training & Study Abroad",
  description:
    "Build practical career skills and explore international education opportunities with Carolina Academy, a TVEC-registered training institute and study-abroad consultancy in Chilaw, Sri Lanka.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <SchemaMarkup
        schema={webPageSchema({
          path: "/",
          title: "Carolina Academy Sri Lanka | Vocational Training & Study Abroad",
          description:
            "Build practical career skills and explore international education opportunities with Carolina Academy, a TVEC-registered training institute and study-abroad consultancy in Chilaw, Sri Lanka.",
        })}
      />
      <Hero />
      <TrustIndicators />
      <PathwaysSection />
      <FeaturedProgrammes />
      <WhyChooseUs />
      <PracticalTraining />
      <SouthKoreaFeature />
      <ApplicationProcessSection />
      <FacilitiesSection />
      <StudentSupportSection />
      <UpcomingIntakes />
      <TestimonialsSection />
      <HomeFAQSection />
      <ConsultationCTA />
      <ContactSection />
    </>
  );
}
