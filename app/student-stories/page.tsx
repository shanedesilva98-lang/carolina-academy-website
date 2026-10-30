import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/content/testimonials";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Student Stories | Carolina Academy",
  description:
    "Student stories from Carolina Academy's vocational training and study-abroad programmes.",
  path: "/student-stories",
  noindex: true,
});

export default function StudentStoriesPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/student-stories", title: "Student Stories", description: "Student stories from Carolina Academy." })} />
      <Breadcrumbs items={[{ name: "Student Stories", path: "/student-stories" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Student Stories</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Stories from Carolina Academy students.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Student Stories" title="Student Perspectives" />
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
