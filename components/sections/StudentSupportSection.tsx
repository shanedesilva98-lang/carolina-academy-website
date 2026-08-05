import { FileText, MessageSquare, PlaneTakeoff, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";

const services = [
  { icon: MessageSquare, title: "Guidance Sessions", description: "One-on-one conversations to understand your goals and options." },
  { icon: FileText, title: "Document Support", description: "Help preparing and organising the documents your application needs." },
  { icon: Wallet, title: "Financial Preparation Guidance", description: "Understanding tuition, living costs and proof-of-funds expectations." },
  { icon: PlaneTakeoff, title: "Pre-Departure Guidance", description: "Practical preparation for students heading abroad to study." },
];

export function StudentSupportSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Student Support Services"
          title="Support at Every Step"
          description="From your first enquiry to preparing for departure, Carolina Academy's team is available to help."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.05} className="rounded-2xl border border-border bg-white p-6 text-center shadow-soft">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-sm font-bold text-navy">{service.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{service.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
