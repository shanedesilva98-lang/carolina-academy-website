import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";

const facilities = [
  {
    src: "/images/facilities/food-safety-classroom.jpg",
    alt: "A woman instructor standing beside a whiteboard and a Food Safety slide while a classroom of students in white shirts watches from wooden desks",
  },
  {
    src: "/images/facilities/culinary-training-pot.jpg",
    alt: "A chef instructor in a black jacket stirring a large pot while four trainees in white shirts and chef hats watch in a commercial kitchen",
  },
  { src: "/images/facilities/carolina-beach-resort.jpg", alt: "Carolina Beach Resort hospitality training environment" },
  {
    src: "/images/facilities/consultation-office.jpg",
    alt: "Two students in business attire seated at a wooden desk in a one-on-one consultation with a man in a blue shirt, while a staff member in uniform stands behind holding a folder",
  },
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
