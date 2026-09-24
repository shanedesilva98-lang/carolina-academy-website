import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";

const facilities = [
  { src: "/images/facilities-classroom.svg", alt: "Training classroom at Carolina Academy" },
  { src: "/images/facilities-kitchen.svg", alt: "Practical training kitchen at Carolina Academy" },
  { src: "/images/facilities/carolina-beach-resort.jpg", alt: "Carolina Beach Resort hospitality training environment" },
  { src: "/images/facilities-consultation-area.svg", alt: "Study-abroad consultation area at Carolina Academy" },
];

export function FacilitiesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Where You'll Train"
          title="Our Facilities"
          description="Training takes place in a real hospitality setting at Carolina Beach Resort, supported by dedicated classroom and consultation spaces."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {facilities.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.05} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
            </FadeIn>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="link">
            <Link href="/facilities">
              View all facilities <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
