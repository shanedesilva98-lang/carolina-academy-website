import { LeadForm } from "@/components/forms/LeadForm";
import { FadeIn } from "@/components/shared/FadeIn";

export function ConsultationCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 rounded-3xl bg-gradient-to-br from-navy to-royal p-8 text-white sm:p-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Free Consultation</p>
            <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Not Sure Where to Start?</h2>
            <p className="mt-4 max-w-md text-white/80">
              Book a free consultation with Carolina Academy&apos;s team to talk through vocational course options or
              your study-abroad goals — no obligation, no pressure.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-2xl bg-white p-6 sm:p-8">
            <LeadForm source="homepage-consultation-cta" title="Request a Free Consultation" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
