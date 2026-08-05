import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading eyebrow="Student Stories" title="Sample Student Perspectives" />
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          The cards below are labelled <strong>Sample Content</strong> and illustrate how verified, consented student
          stories will appear once published. See the{" "}
          <Link href="/student-stories" className="font-semibold text-royal hover:underline">
            Student Stories
          </Link>{" "}
          page for more.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.05}>
              <TestimonialCard testimonial={testimonial} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
