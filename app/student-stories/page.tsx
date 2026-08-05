import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/content/testimonials";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Student Stories | Carolina Academy",
  description:
    "Student stories from Carolina Academy's vocational training and study-abroad programmes. Currently shown as clearly labelled sample content pending verified, consented submissions.",
  path: "/student-stories",
  noindex: true,
});

export default function StudentStoriesPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/student-stories", title: "Student Stories", description: "Sample student stories from Carolina Academy." })} />
      <Breadcrumbs items={[{ name: "Student Stories", path: "/student-stories" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Student Stories</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Stories from Carolina Academy students, shared with their consent. This page currently displays
            sample content only.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <DisclaimerBox title="About the content on this page" className="mb-10 max-w-3xl">
            No verified, consented student stories have been published yet. The cards below are clearly labelled{" "}
            <strong>Sample Content</strong> and illustrate the intended layout only — they are not real student
            claims. This page is set to noindex until genuine, consented stories replace the samples.
          </DisclaimerBox>

          <SectionHeading eyebrow="Sample Content" title="Preview Layout" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
