import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCard } from "@/components/cards/ContactCard";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { FadeIn } from "@/components/shared/FadeIn";

export function ContactSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading eyebrow="Visit or Contact Us" title="Find Carolina Academy" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <ContactCard />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-3">
            <MapEmbed />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
