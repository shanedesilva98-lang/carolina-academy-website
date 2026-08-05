import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCard } from "@/components/cards/ContactCard";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { FadeIn } from "@/components/shared/FadeIn";

export function ContactSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Visit or Contact Us"
          title="Find Carolina Academy"
          description="Practical training happens at our Hospitality Training Center in Chilaw. Looking for study-abroad guidance? Visit our Study Abroad Office in Katunayake instead."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <ContactCard />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-3">
            <MapEmbed />
          </FadeIn>
        </div>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:underline">
          View both locations and full contact details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
