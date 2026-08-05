import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CoursesExplorer } from "./CoursesExplorer";
import { courses } from "@/content/courses";
import { getFaqsByTopic } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "All Courses | Vocational Training Programmes | Carolina Academy",
  description:
    "Browse Carolina Academy's vocational training programmes, including Pastry & Bakery NVQ, hospitality, welding and health sciences. Each course clearly shows active or upcoming status.",
  path: "/courses",
});

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
            Practical, competency-based training programmes designed to build employment-ready skills. Every
            course is clearly labelled as an Active Programme, Upcoming Programme or Under Development.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <CoursesExplorer courses={courses} />
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="bg-surface-off py-16 sm:py-20">
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
