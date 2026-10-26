import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Award, Calendar, CheckCircle2, Clock, Languages, MapPin, Wallet } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courseCategoryLabels, courseDivisions, courseStatusLabels, courses, getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { courseSchema, webPageSchema } from "@/lib/schema";
import type { Course } from "@/types/course";

/** Courses that have their own purpose-built page, which takes precedence over this template. */
const DEDICATED_COURSE_PAGES = new Set(["pastry-bakery-nvq-level-3-4"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.filter((course) => !DEDICATED_COURSE_PAGES.has(course.slug)).map((course) => ({ slug: course.slug }));
}

function summarise(course: Course): string {
  const text = course.overview;
  return text.length <= 155 ? text : `${text.slice(0, 152).trimEnd()}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return buildMetadata({ title: "Course Not Found", description: "This course could not be found.", path: `/courses/${slug}`, noindex: true });
  }

  return buildMetadata({
    title: `${course.title} | Carolina Academy`,
    description: summarise(course),
    path: `/courses/${course.slug}`,
  });
}

const statusBadge = {
  active: "active",
  upcoming: "upcoming",
  "under-development": "requires-confirmation",
} as const;

const isPlaceholder = (value: string) => value === "[REQUIRES CONFIRMATION]";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course || DEDICATED_COURSE_PAGES.has(course.slug)) notFound();

  const path = `/courses/${course.slug}`;
  const division = courseDivisions.find((item) => item.id === course.category);
  const isActive = course.status === "active";
  const isForeignEmployment = course.category === "foreign-employment";

  const facts = [
    { icon: Award, label: "Qualification", value: course.qualificationLabel },
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Calendar, label: "Next Intake", value: course.nextIntake },
    { icon: MapPin, label: "Location", value: course.location },
    { icon: Wallet, label: "Course Fee", value: course.fee },
    { icon: Languages, label: "Medium", value: course.medium },
  ];

  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path, title: course.title, description: summarise(course) }),
          ...(isActive ? [courseSchema(course)] : []),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Courses", path: "/courses" },
          ...(division ? [{ name: division.label, path: division.href }] : []),
          { name: course.shortTitle, path },
        ]}
      />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <VerificationBadge kind={statusBadge[course.status]} className="mb-4" />
            {division ? (
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">
                <Link href={division.href} className="hover:underline">
                  {courseCategoryLabels[course.category]}
                </Link>
              </p>
            ) : null}
            <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-5 text-white/80">{course.overview}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <LastUpdated date={course.updatedAt} />
              {course.courseCode ? <span className="text-xs text-white/70">Course code: {course.courseCode}</span> : null}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href={course.applicationUrl}>{isActive ? "Apply Now" : "Register Your Interest"}</Link>
              </Button>
              <WhatsAppButton message={course.whatsappMessage} source={`course-${course.slug}`} label="Ask on WhatsApp" />
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10 shadow-lift">
            <Image
              src={course.featuredImage.src}
              alt={course.featuredImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-off py-10">
        <div className="container grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-border bg-white p-4">
              <fact.icon className="h-5 w-5 text-royal" aria-hidden="true" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{fact.label}</p>
              <p className="mt-1 text-sm font-bold text-navy">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-10 lg:col-span-2">
            {!isActive ? (
              <DisclaimerBox variant="info" title={courseStatusLabels[course.status]}>
                This programme is not yet open for enrolment. Details marked [REQUIRES CONFIRMATION] are still
                being finalised and will be published once confirmed.
              </DisclaimerBox>
            ) : null}
            {isForeignEmployment ? (
              <DisclaimerBox title="Training only — no guaranteed outcome">
                Carolina Academy provides training and assessment preparation. Employment, visas, external
                examinations and overseas deployment are decided by employers, examining bodies and government
                authorities, and placement is not guaranteed. See the{" "}
                <Link href="/courses/foreign-employment" className="font-semibold text-royal hover:underline">
                  Foreign Employment Based Training overview
                </Link>
                .
              </DisclaimerBox>
            ) : null}

            <div>
              <SectionHeading eyebrow="Who It Is For" title="Who Can Apply?" />
              <ul className="mt-4 flex flex-col gap-2 text-ink-muted">
                {course.audience.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-heading text-lg font-bold text-navy">Entry Requirements</h3>
              <ul className="mt-3 flex flex-col gap-2 text-ink-muted">
                {course.entryRequirements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                    {isPlaceholder(item) ? `${item} — to be published once the programme is confirmed` : item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Qualification" title="What Qualification Will I Receive?" />
              <p className="mt-4 text-ink-muted leading-relaxed">{course.qualificationLabel}.</p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{course.accreditation.note}</p>
            </div>

            <div>
              <SectionHeading eyebrow="Duration" title="How Long Is the Programme?" />
              <p className="mt-4 text-ink-muted leading-relaxed">
                {isPlaceholder(course.duration) ? "Duration to be confirmed." : course.duration}
              </p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {isPlaceholder(course.schedule) ? "Schedule to be confirmed." : course.schedule}
              </p>
            </div>

            {course.curriculum.length > 0 ? (
              <div>
                <SectionHeading eyebrow="Curriculum" title="What You&apos;ll Learn" />
                <p className="mt-4 text-sm text-ink-muted leading-relaxed">{course.curriculumNote}</p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {course.curriculum.map((group) => (
                    <Card key={group.category}>
                      <CardContent className="p-5">
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
            ) : (
              <div>
                <SectionHeading eyebrow="Curriculum" title="What Will I Learn?" />
                <p className="mt-4 text-ink-muted leading-relaxed">{course.curriculumNote}</p>
              </div>
            )}

            <div>
              <SectionHeading eyebrow="Practical Training" title="Where Is Training Conducted?" />
              <p className="mt-4 text-ink-muted leading-relaxed">{course.practicalTraining}</p>
              {!isPlaceholder(course.trainingVenue) ? (
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">Venue: {course.trainingVenue}</p>
              ) : null}
            </div>

            <div>
              <SectionHeading eyebrow="Assessment" title="How Is It Assessed?" />
              <p className="mt-4 text-ink-muted leading-relaxed">
                {isPlaceholder(course.assessment) ? "Assessment details to be confirmed." : course.assessment}
              </p>
            </div>

            <div>
              <SectionHeading eyebrow="Careers" title="What Can This Lead To?" />
              <ul className="mt-4 flex flex-col gap-2 text-ink-muted">
                {course.careerOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-muted">
                Carolina Academy prepares students with job-ready skills but does not guarantee employment, visas
                or overseas placement.
              </p>
            </div>

            <div>
              <SectionHeading eyebrow="Fees" title="How Much Does It Cost?" />
              {isPlaceholder(course.fee) ? (
                <p className="mt-4 text-ink-muted leading-relaxed">
                  The course fee and any instalment options will be published once confirmed. Contact Carolina
                  Academy for the latest information.
                </p>
              ) : (
                <p className="mt-4 text-ink-muted leading-relaxed">Course fee: {course.fee}</p>
              )}
              {Array.isArray(course.instalments) ? (
                <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-muted">
                  {course.instalments.map((item) => (
                    <li key={item.label}>
                      {item.label}: {item.amount}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <aside className="flex flex-col gap-6 self-start rounded-2xl border border-border bg-surface-off p-6 lg:sticky lg:top-28">
            <h2 className="font-heading text-lg font-bold text-navy">Quick Facts</h2>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="font-semibold text-navy">Status</dt>
                <dd className="text-ink-muted">{courseStatusLabels[course.status]}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Accreditation</dt>
                <dd className="text-ink-muted">{course.accreditation.body}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Division</dt>
                <dd className="text-ink-muted">{courseCategoryLabels[course.category]}</dd>
              </div>
            </dl>
            <WhatsAppButton message={course.whatsappMessage} source={`course-${course.slug}-sidebar`} label="Enquire on WhatsApp" />
          </aside>
        </div>
      </section>

      {course.faqs.length > 0 ? (
        <section className="bg-surface-off py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={course.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy">
            {isActive ? "Ready to Apply?" : "Interested in This Programme?"}
          </h2>
          <p className="max-w-xl text-ink-muted">
            {isActive
              ? "Start your application or ask the team a question."
              : "Register your interest and we will let you know when programme details, fees and start dates are confirmed."}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href={course.applicationUrl}>{isActive ? "Apply Now" : "Register Your Interest"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
