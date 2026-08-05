import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FadeIn } from "@/components/shared/FadeIn";

const steps = [
  { title: "Initial Enquiry", description: "Contact Carolina Academy by phone, WhatsApp, email or the online form." },
  { title: "Guidance Session", description: "Discuss your goals, whether vocational training or study abroad." },
  { title: "Application", description: "Submit your application with the required documents." },
  { title: "Confirmation", description: "Receive confirmation of your place or next steps once reviewed." },
];

export function ApplicationProcessSection() {
  return (
    <section className="bg-surface-off py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Getting Started"
          title="How to Apply"
          description="A simple, transparent process for both vocational courses and study-abroad guidance."
        />
        <FadeIn className="mt-10">
          <ProcessSteps steps={steps} />
        </FadeIn>
      </div>
    </section>
  );
}
