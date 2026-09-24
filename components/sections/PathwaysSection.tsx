import { GraduationCap, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PathwayCard } from "@/components/cards/PathwayCard";
import { FadeIn } from "@/components/shared/FadeIn";

export function PathwaysSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Two Ways to Move Forward"
          title="Choose Your Pathway"
          description="Whether you want hands-on career skills or a route to studying abroad, Carolina Academy guides you step by step."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeIn>
            <PathwayCard
              title="Vocational Training"
              description="Practical, competency-based programmes designed to develop workplace skills for local and international industries."
              href="/courses"
              ctaLabel="View Courses"
              icon={GraduationCap}
              variant="navy"
              image={{
                src: "/images/pathways/practical-training-kitchen.jpg",
                alt: "Carolina Academy trainers and hospitality students in chef whites in the practical training kitchen",
              }}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <PathwayCard
              title="Study Abroad"
              description="Guidance for university selection, applications, documentation, visa preparation and pre-departure planning."
              href="/study-abroad"
              ctaLabel="Explore Study Abroad"
              icon={Globe2}
              variant="royal"
              image={{
                src: "/images/pathways/south-korea-campus.png",
                alt: "Students walking on a South Korean university campus with the city skyline and Namsan Tower in the background",
              }}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
