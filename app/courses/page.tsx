import Link from "next/link";
import { ArrowRight, ChefHat, HeartPulse, Plane, Wrench, type LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CoursesExplorer } from "./CoursesExplorer";
import { courseDivisions, courses, getCoursesByCategory } from "@/content/courses";
import { getFaqsByTopic } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "All Courses | Vocational Training Programmes | Carolina Academy",
  description:
    "Browse Carolina Academy's vocational training programmes across four divisions: Hospitality, Technology, Health Sciences and Foreign Employment Based Training. Each course clearly shows active or upcoming status.",
  path: "/courses",
});

const divisionIcons: Record<string, LucideIcon> = {
  hospitality: ChefHat,
  technology: Wrench,
  "health-sciences": HeartPulse,
  "foreign-employment": Plane,
};

export default function CoursesPage() {
  const faqs = getFaqsByTopic("courses");

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/courses", title: "All Courses", description: "Carolina Academy's vocational training programmes." })} />
      <Breadcrumbs items={[{ name: "Courses", path: "/courses" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Vocational Courses</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Practical, competency-based training programmes designed to build employment-ready skills, organised
            into four divisions. Every course is clearly labelled as an Active Programme, Upcoming Programme or
            Under Development.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Four Divisions" title="Choose a Division" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courseDivisions.map((division) => {
              const Icon = divisionIcons[division.id];
              const count = getCoursesByCategory(division.id).length;
              return (
                <li key={division.id} className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-royal">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-bold leading-snug text-navy">
                    <Link href={division.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {division.label}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{division.description}</p>
                  <p className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-royal">
                    {count} programme{count === 1 ? "" : "s"} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="All Programmes" title="Search and Filter Courses" />
          <div className="mt-8">
            <CoursesExplorer courses={courses} />
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="Frequently Asked Questions" title="Courses FAQ" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
