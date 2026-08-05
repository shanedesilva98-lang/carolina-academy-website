import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { faqs } from "@/content/faqs";

const homeFaqIds = [
  "what-is-carolina-academy",
  "is-carolina-academy-registered",
  "how-to-apply-for-a-course",
  "study-abroad-what-does-carolina-academy-do",
  "study-abroad-guarantee",
  "can-fees-be-paid-in-instalments",
];

export function HomeFAQSection() {
  const items = faqs.filter((faq) => homeFaqIds.includes(faq.id));

  return (
    <section className="bg-surface-off py-16 sm:py-20">
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="Frequently Asked Questions" title="Answers to Common Questions" align="center" />
        <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
