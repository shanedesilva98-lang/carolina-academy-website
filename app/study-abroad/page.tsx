import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, FileText, PlaneTakeoff, ShieldQuestion, Wallet, Globe2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudyAbroadEligibilityForm } from "@/components/forms/StudyAbroadEligibilityForm";
import { getFaqsByTopic } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Study Abroad with Expert Guidance | Carolina Academy",
  description:
    "Carolina Academy supports Sri Lankan students exploring study-abroad options, currently with a focus on South Korea — from university selection through application, documentation, visa preparation and pre-departure guidance.",
  path: "/study-abroad",
});

const services = [
  { icon: BookOpen, title: "University & Programme Selection", description: "Guidance on choosing universities and programmes suited to your goals." },
  { icon: FileText, title: "Application Support", description: "Help understanding and completing application requirements." },
  { icon: FileText, title: "Document Preparation", description: "Support organising and preparing academic and personal documents." },
  { icon: ShieldQuestion, title: "Visa-Document Guidance", description: "Preparation support for visa-related documentation." },
  { icon: Wallet, title: "Financial Preparation", description: "Understanding tuition, living costs and proof-of-funds expectations." },
  { icon: PlaneTakeoff, title: "Pre-Departure Guidance", description: "Practical preparation for travel and settling in abroad." },
];

export default function StudyAbroadPage() {
  const faqs = getFaqsByTopic("study-abroad");

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/study-abroad", title: "Study Abroad with Expert Guidance", description: "Carolina Academy's study-abroad guidance services." })} />
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Study Abroad with Expert Guidance</h1>
            <p className="mt-5 text-white/80">
              Carolina Academy helps Sri Lankan students plan and prepare for study abroad — currently with a
              dedicated focus on South Korea — through personalised guidance at every stage.
            </p>
            <div className="mt-6"><LastUpdated date="2026-08-04" /></div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/study-abroad/south-korea">
                  Study in South Korea <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                <Link href="/study-abroad/application-process">View Application Process</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10">
            <Image src="/images/student-consultation.svg" alt="Study-abroad consultation session at Carolina Academy" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Destinations" title="Where We Currently Support" />
          <div className="mt-8 max-w-xl">
            <Link href="/study-abroad/south-korea" className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-lift">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-soft text-royal">
                <Globe2 className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">South Korea</h3>
                <p className="text-sm text-ink-muted">University degrees, Korean-language pathways and career-focused study.</p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-royal transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-muted">
            Additional destinations may be added in future as Carolina Academy&apos;s study-abroad consultancy
            expands. This page will be updated when new destinations are confirmed.
          </p>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Our Services" title="How We Support You" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title}>
                <CardContent className="flex flex-col gap-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-royal">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">{service.title}</h3>
                  <p className="text-sm text-ink-muted">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Get Started" title="Study Abroad Consultation" align="center" />
          <Card className="mt-10">
            <CardContent className="p-6 sm:p-8">
              <StudyAbroadEligibilityForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="bg-surface-off py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Study Abroad Questions" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <DisclaimerBox title="Study Abroad Disclaimer">
            Carolina Academy provides application and documentation support only. Admission decisions are made
            solely by the receiving educational institution. Visa decisions are made solely by the relevant
            government authority. Employment eligibility while studying abroad is controlled by applicable laws
            and visa conditions. Requirements and costs may change — always confirm current information with the
            official university, embassy or immigration source before making decisions.
          </DisclaimerBox>
        </div>
      </section>
    </>
  );
}
