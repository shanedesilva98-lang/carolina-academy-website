import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Languages, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";

const pathways = [
  { icon: BookOpen, title: "University Degree Pathway", description: "For students seeking undergraduate or postgraduate education." },
  { icon: Languages, title: "Korean Language to Degree Pathway", description: "For students who need Korean-language proficiency before academic study." },
  { icon: Briefcase, title: "Career-Focused Study Pathway", description: "For students considering programmes linked to specific professional sectors." },
];

export function SouthKoreaFeature() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/south-korea-city.svg"
              alt="South Korea city life and student environment"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <SectionHeading eyebrow="Study Abroad" title="Study in South Korea" />
          <p className="mt-4 text-ink-muted">
            Carolina Academy guides Sri Lankan students through university degrees, Korean-language programmes and
            career-focused study options in South Korea — from initial planning through to pre-departure.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {pathways.map((pathway) => (
              <div key={pathway.title} className="flex items-start gap-3 rounded-2xl border border-border p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft text-royal">
                  <pathway.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-navy">{pathway.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-muted">{pathway.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild size="lg" variant="primary" className="mt-8">
            <Link href="/study-abroad/south-korea">
              Explore South Korea Pathways <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
