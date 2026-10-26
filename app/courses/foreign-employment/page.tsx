import Link from "next/link";
import { LifeBuoy, SprayCan } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { courseStatusLabels, getCoursesByCategory } from "@/content/courses";
import { getFaqsByTopic } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Foreign Employment Based Training Programmes | Carolina Academy",
  description:
    "Short, practice-led Lifeguard Training and Public Area Housekeeping programmes that prepare candidates for entry-level roles abroad. Training and assessment preparation only — no job, visa or licence is guaranteed.",
  path: "/courses/foreign-employment",
});

const programmes = getCoursesByCategory("foreign-employment");

const programmeIcons = {
  "lifeguard-training-examination-preparation": LifeBuoy,
  "public-area-housekeeping-training": SprayCan,
} as const;

const steps = [
  {
    title: "Registration and screening",
    description:
      "Candidates register and are screened before the course — for example a swim, endurance and fitness check for Lifeguard Training.",
  },
  {
    title: "Intensive, practice-led training",
    description:
      "Short programmes of 18 to 30 guided hours, roughly 20% theory and 80% supervised practice in small groups.",
  },
  {
    title: "Internal assessment",
    description:
      "Knowledge and observed practical assessments. Critical safety competencies must be passed — a high overall score cannot offset them.",
  },
  {
    title: "Next steps, where eligible",
    description:
      "Candidates who pass may be eligible to attend an employer interview, practical assessment or external examination, where one is arranged.",
  },
];

export default function ForeignEmploymentPage() {
  const faqs = getFaqsByTopic("foreign-employment");

  return (
    <>
      <SchemaMarkup
        schema={webPageSchema({
          path: "/courses/foreign-employment",
          title: "Foreign Employment Based Training Programmes",
          description: "Carolina Academy's short training programmes preparing candidates for entry-level roles abroad.",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Courses", path: "/courses" },
          { name: "Foreign Employment Based Training", path: "/courses/foreign-employment" },
        ]}
      />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">
            Foreign Employment Based Training Programmes
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Short, practice-led programmes that prepare candidates for entry-level roles abroad by building
            job-ready skills and readiness for employer assessments. Carolina Academy provides the training —
            employers, examining bodies and government authorities make the decisions on employment,
            certification and visas.
          </p>
          <div className="mt-6">
            <LastUpdated date="2026-10-26" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Programmes" title="What Training Is Planned?" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            Both programmes are currently designed around entry-level roles in Dubai, UAE. They are shown as{" "}
            <strong>Upcoming Programmes</strong> — details, fees and start dates are being finalised, and no
            enrolment is confirmed until a programme is marked Active.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {programmes.map((course) => (
              <FacultyCard
                key={course.id}
                id={course.slug}
                title={course.title}
                description={course.overview}
                status={course.status}
                icon={programmeIcons[course.slug as keyof typeof programmeIcons] ?? LifeBuoy}
                image={course.featuredImage}
                href={`/courses/${course.slug}`}
              />
            ))}
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Foreign Employment Based Training Programmes at a glance</caption>
              <thead className="bg-surface-soft text-navy">
                <tr>
                  <th scope="col" className="px-5 py-3 font-heading font-bold">Programme</th>
                  <th scope="col" className="px-5 py-3 font-heading font-bold">Duration</th>
                  <th scope="col" className="px-5 py-3 font-heading font-bold">Certificate</th>
                  <th scope="col" className="px-5 py-3 font-heading font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-ink-muted">
                {programmes.map((course) => (
                  <tr key={course.id}>
                    <th scope="row" className="px-5 py-3 font-semibold text-navy">
                      <Link href={`/courses/${course.slug}`} className="hover:text-royal hover:underline">
                        {course.shortTitle}
                      </Link>
                    </th>
                    <td className="px-5 py-3">{course.duration}</td>
                    <td className="px-5 py-3">{course.qualificationLabel}</td>
                    <td className="px-5 py-3">{courseStatusLabels[course.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DisclaimerBox title="Training only — no guaranteed outcome" className="mt-10 max-w-3xl">
            Carolina Academy provides training and assessment preparation. It does not guarantee employment,
            visas, external examination results or overseas deployment, and placement depends on employers and
            the relevant authorities. The Carolina Academy Certificate of Completion is not an NVQ award, a UAE
            government licence or a substitute for a recognised external qualification. Requirements can
            change — always confirm current employer and examining-body requirements before enrolling.
          </DisclaimerBox>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="How It Works" title="From Screening to Assessment" />
          <div className="mt-10">
            <ProcessSteps steps={steps} />
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Foreign Employment Training Questions" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy">Interested in one of these programmes?</h2>
          <p className="max-w-xl text-ink-muted">
            Register your interest and we will let you know when programme details, fees and start dates are
            confirmed.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <WhatsAppButton
              message="Hello Carolina Academy, I would like more information about the Foreign Employment Based Training Programmes."
              source="foreign-employment-cta"
              label="Ask on WhatsApp"
            />
            <Button asChild size="lg" variant="outline">
              <Link href="/contact?enquiry=foreign-employment-training">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
