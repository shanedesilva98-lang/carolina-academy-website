import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { HeroSlideshow, type HeroSlide } from "@/components/sections/HeroSlideshow";

const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero/hero-vocational-training.jpg",
    alt: "Carolina Academy's Managing Director delivering a welcome speech at a Carolina Academy student seminar",
  },
  {
    src: "/images/hero/hero-ceremonial-lamp-lighting.jpg",
    alt: "Traditional oil lamp lighting ceremony opening a Carolina Academy study-abroad seminar",
  },
  {
    src: "/images/hero/hero-seminar-audience.jpg",
    alt: "Students and parents attending a Carolina Academy study-abroad seminar",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-royal/40" aria-hidden="true" />
      <div className="container relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <FadeIn>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
            TVEC Registered Institution — Chilaw, Sri Lanka
          </p>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            Build Skills. Study Abroad. Create Your Future.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Carolina Academy provides practical vocational training and personalised study-abroad guidance to help
            Sri Lankan students build recognised skills, access international education and prepare for career
            opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="gold">
              <Link href="/courses">
                Explore Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link href="/study-abroad/south-korea">Study in South Korea</Link>
            </Button>
          </div>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold underline-offset-4 hover:underline">
            Book a Free Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.15} className="relative">
          <HeroSlideshow slides={heroSlides} />
        </FadeIn>
      </div>
    </section>
  );
}
