import Image from "next/image";
import { CheckCircle2, Clock, MapPin, Wallet, Calendar, Languages, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Gallery } from "@/components/shared/Gallery";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, courseSchema, breadcrumbListSchema } from "@/lib/schema";
import { formatInstalments } from "@/lib/utils";

const course = getCourseBySlug("pastry-bakery-nvq-level-3-4")!;

export const metadata = buildMetadata({
  title: "Pastry & Bakery NVQ Level 3/4 Course | Carolina Academy",
  description:
    "Practical Pastry & Bakery NVQ Level 3/4 training at Carolina Academy, with hands-on practice at Carolina Beach Resort, Chilaw. Course code D15S002. Apply online today.",
  path: "/courses/pastry-bakery-nvq-level-3-4",
});

const factSheet = [
  { icon: Award, label: "Qualification", value: course.qualificationLabel },
  { icon: Clock, label: "Duration", value: course.duration },
  { icon: Calendar, label: "Next Intake", value: course.nextIntake },
  { icon: MapPin, label: "Training Venue", value: course.trainingVenue },
  { icon: Wallet, label: "Course Fee", value: course.fee },
  { icon: Languages, label: "Medium", value: course.medium },
];

export default function PastryBakeryCoursePage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/courses/pastry-bakery-nvq-level-3-4", title: course.title, description: course.overview }),
          courseSchema(course),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Hospitality", path: "/courses/hospitality" },
            { name: course.shortTitle, path: "/courses/pastry-bakery-nvq-level-3-4" },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Courses", path: "/courses" },
          { name: "Hospitality", path: "/courses/hospitality" },
          { name: "Pastry & Bakery NVQ Level 3/4", path: "/courses/pastry-bakery-nvq-level-3-4" },
        ]}
      />

      {/* Hero */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <VerificationBadge kind="active" />
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-5 text-white/80">{course.overview}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <LastUpdated date={course.updatedAt} />
              <span className="text-xs text-white/60">Course code: {course.courseCode}</span>
            </div>
            <div className="mt-8">
              <WhatsAppButton message={course.whatsappMessage} source="pastry-course-hero" label="Ask a Question on WhatsApp" />
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10">
            <Image src={course.featuredImage.src} alt={course.featuredImage.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Fact sheet */}
      <section className="border-b border-border bg-surface-off py-10">
        <div className="container grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {factSheet.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-border bg-white p-4">
              <fact.icon className="h-5 w-5 text-royal" aria-hidden="true" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{fact.label}</p>
              <p className="mt-1 text-sm font-bold text-navy">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Course Overview" title="What Is This Course?" />
            <p className="mt-4 text-ink-muted leading-relaxed">{course.overview}</p>

            <h2 className="mt-10 font-heading text-2xl font-bold text-navy">Who This Course Is For</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {course.audience.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-2xl font-bold text-navy">Qualification</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              This programme is structured around the <strong>{course.qualificationLabel}</strong> competency
              profile (course code {course.courseCode}). {course.accreditation.note}
            </p>

            <h2 className="mt-10 font-heading text-2xl font-bold text-navy">Entry Requirements</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {course.entryRequirements.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" /> {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-2xl font-bold text-navy">Course Duration</h2>
            <p className="mt-4 text-ink-muted">{course.duration} — Schedule: {course.schedule} — Medium: {course.medium}</p>
          </div>

          <aside className="lg:col-span-1">
            <Card className="sticky top-28">
              <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="font-heading text-lg font-bold text-navy">Quick Facts</h3>
                <dl className="flex flex-col gap-3 text-sm">
                  <div>
                    <dt className="font-semibold text-ink-muted">Accreditation</dt>
                    <dd className="text-navy">{course.accreditation.body}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-muted">Location</dt>
                    <dd className="text-navy">{course.location}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-muted">Instalments</dt>
                    <dd className="text-navy">{formatInstalments(course.instalments)}</dd>
                  </div>
                </dl>
                <WhatsAppButton message={course.whatsappMessage} source="pastry-course-sidebar" label="Enquire on WhatsApp" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Curriculum" title="What You'll Learn" />
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">{course.curriculumNote}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {course.curriculum.map((group) => (
              <Card key={group.category}>
                <CardContent className="p-6">
                  <h3 className="font-heading text-base font-bold text-navy">{group.category}</h3>
                  <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-muted">
                    {group.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" /> {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practical training & facilities */}
      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Practical Training" title="Hands-On Learning" />
            <p className="mt-4 text-ink-muted leading-relaxed">{course.practicalTraining}</p>
            <h2 className="mt-8 font-heading text-xl font-bold text-navy">Training Facilities</h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Training is based at {course.trainingVenue}, giving students access to a functioning hospitality
              kitchen environment.
            </p>
          </div>
          <Gallery images={course.gallery} />
        </div>
      </section>

      {/* Trainer profiles */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Trainers" title="Trainer Profiles" />
          <DisclaimerBox variant="info" title="Trainer profiles pending confirmation" className="mt-6 max-w-2xl">
            Detailed trainer profiles, qualifications and industry experience will be published here once
            confirmed. See the{" "}
            <a href="/about" className="font-semibold text-royal hover:underline">
              About page
            </a>{" "}
            for general institute information.
          </DisclaimerBox>
        </div>
      </section>

      {/* Assessment & careers */}
      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Assessment" title="How You're Assessed" />
            <p className="mt-4 text-ink-muted leading-relaxed">{course.assessment}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Career Opportunities" title="Where This Can Take You" />
            <ul className="mt-4 flex flex-col gap-2.5">
              {course.careerOutcomes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> {item}
                </li>
              ))}
            </ul>
            <DisclaimerBox className="mt-6">
              Carolina Academy prepares students with employment-oriented skills but does not guarantee job
              placement. Employment outcomes depend on individual performance, employer requirements and market
              conditions.
            </DisclaimerBox>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Fees" title="Fee & Instalment Plan" />
          <Card className="mt-8 max-w-xl">
            <CardContent className="flex flex-col gap-3 p-6">
              <p className="text-sm text-ink-muted">
                <strong className="text-navy">Course fee:</strong> {course.fee}
              </p>
              <p className="text-sm text-ink-muted">
                <strong className="text-navy">Instalment options:</strong> {formatInstalments(course.instalments)}
              </p>
              <p className="text-xs text-ink-muted">
                Confirm the current fee structure directly with Carolina Academy before enrolling.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What students receive */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="What You Receive" title="Included With This Course" />
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Structured theory and practical training sessions",
              "Hands-on practice at Carolina Beach Resort",
              "Guidance from Carolina Academy's training team",
              "Assessment aligned with the official programme syllabus",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4 text-sm text-ink-muted">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application process */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="How to Apply" title="Application Process" />
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Complete the application form on this page",
              "Our team reviews your application",
              "We contact you to confirm entry requirements",
              "Confirm your place and next steps",
            ].map((step, index) => (
              <li key={step} className="rounded-2xl border border-border bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" />
          <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
            <FAQAccordion items={course.faqs} />
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="scroll-mt-24 bg-surface-off py-16 sm:py-20">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Apply Now" title="Apply for This Course" align="center" />
          <Card className="mt-10">
            <CardContent className="p-6 sm:p-8">
              <CourseApplicationForm defaultCourseSlug={course.slug} />
            </CardContent>
          </Card>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton message={course.whatsappMessage} source="pastry-course-bottom" label="Prefer WhatsApp? Message Us" />
          </div>
        </div>
      </section>
    </>
  );
}
