import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Card, CardContent } from "@/components/ui/card";
import { getFaqsByTopic } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "South Korea Student Visa Guidance | Carolina Academy",
  description:
    "Guidance on South Korea D-2 and D-4 student visa categories, required documents and the process, with clear disclaimers that visa decisions rest with Korean immigration authorities.",
  path: "/study-abroad/south-korea/visa-guidance",
});

const visaTypes = [
  {
    code: "D-2",
    title: "D-2 Student Visa",
    description: "Generally associated with degree-level study (undergraduate, postgraduate) at a Korean university. Exact eligibility criteria are set by Korean immigration authorities.",
  },
  {
    code: "D-4",
    title: "D-4 Language-Training Visa",
    description: "Generally associated with language-training programmes, such as Korean-language courses ahead of degree study. Exact eligibility criteria are set by Korean immigration authorities.",
  },
];

const documentCategories = [
  { title: "Required Documents", items: ["Valid passport", "Completed visa application form", "Letter of admission / certificate of enrolment from the institution", "Passport-sized photographs", "Academic transcripts and certificates"] },
  { title: "Financial Evidence", items: ["Bank statements or proof-of-funds documentation", "Sponsor documentation (where applicable)", "Scholarship confirmation (where applicable)"] },
  { title: "Medical / Health Screening", items: ["Tuberculosis (TB) screening where required by the receiving country or institution", "Other medical documentation as specified by the embassy or institution"] },
  { title: "Document Legalisation", items: ["Notarisation or apostille of academic documents where required", "Translation of documents into Korean or English where required"] },
];

export default function VisaGuidancePage() {
  const faqs = getFaqsByTopic("visa");

  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/study-abroad/south-korea/visa-guidance", title: "South Korea Student Visa Guidance", description: "Guidance on South Korea D-2 and D-4 student visas." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Study Abroad", path: "/study-abroad" },
            { name: "South Korea", path: "/study-abroad/south-korea" },
            { name: "Visa Guidance", path: "/study-abroad/south-korea/visa-guidance" },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Study Abroad", path: "/study-abroad" },
          { name: "South Korea", path: "/study-abroad/south-korea" },
          { name: "Visa Guidance", path: "/study-abroad/south-korea/visa-guidance" },
        ]}
      />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">South Korea Student Visa Guidance</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            General information on South Korea&apos;s D-2 and D-4 student visa categories to help you understand what
            to expect. This page does not replace official guidance from Korean immigration authorities.
          </p>
          <div className="mt-6"><LastUpdated date="2026-08-04" /></div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <DisclaimerBox title="Read before relying on this page">
            Visa requirements vary by applicant, institution and current immigration policy, and embassy and
            immigration rules may change at any time. Final decisions on any visa application are made solely by
            the relevant Korean immigration or embassy authority — not by Carolina Academy. Always confirm the
            latest requirements directly with the Embassy of the Republic of Korea or the Korea Immigration
            Service before making plans or submitting an application.
          </DisclaimerBox>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Visa Categories" title="D-2 and D-4 Student Visas" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {visaTypes.map((visa) => (
              <Card key={visa.code}>
                <CardContent className="p-6">
                  <VerificationBadge kind="requires-confirmation" className="mb-3" />
                  <h3 className="font-heading text-lg font-bold text-navy">{visa.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{visa.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Documentation" title="Documents Typically Involved" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {documentCategories.map((category) => (
              <Card key={category.title}>
                <CardContent className="p-6">
                  <h3 className="font-heading text-base font-bold text-navy">{category.title}</h3>
                  <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-muted">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Interview" title="Visa Interview" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Some visa applications may involve an interview at the embassy or consulate. Whether an interview is
              required, and its format, is determined by the relevant Korean immigration or embassy authority.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Timeline" title="Processing Timeline" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Visa processing timelines vary based on embassy workload, application completeness and
              individual circumstances. Carolina Academy cannot guarantee a specific processing time — confirm
              current estimated timelines with the embassy or official immigration source.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Visa Questions" align="center" />
          <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
