import { Hammer, ShieldCheck, Globe2, HeartHandshake, Target, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";

const reasons = [
  { icon: ShieldCheck, title: "TVEC Registered", description: "Registered with the Tertiary and Vocational Education Commission of Sri Lanka (No. P13/0095)." },
  { icon: Hammer, title: "Practical, Hands-On Training", description: "Competency-based programmes built around real workplace practice, not theory alone." },
  { icon: Target, title: "Career-Focused Design", description: "Programmes designed with employment-oriented skills in mind for local and international industries." },
  { icon: Globe2, title: "Study-Abroad Guidance", description: "Dedicated support for South Korea university applications, documentation and visa preparation." },
  { icon: HeartHandshake, title: "Personalised Support", description: "Guidance tailored to each student's background, goals and circumstances." },
  { icon: TrendingUp, title: "Continuous Improvement", description: "Programmes and services reviewed and refined as the institute grows." },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Why Carolina Academy"
          title="A Practical Foundation for Your Future"
          description="Carolina Academy combines TVEC-registered vocational training with dedicated study-abroad guidance, built around student outcomes rather than promises."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <FadeIn key={reason.title} delay={index * 0.05} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-royal">
                <reason.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-navy">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{reason.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
