import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Study Abroad Application Process | Carolina Academy",
  description:
    "A clear, step-by-step overview of Carolina Academy's study-abroad application process, from initial consultation through to travel preparation.",
  path: "/study-abroad/application-process",
});

const steps = [
  { title: "Initial Consultation", description: "Discuss your background, goals and options with Carolina Academy's team." },
  { title: "Eligibility Assessment", description: "Review your academic background and language proficiency against likely programme requirements." },
  { title: "Programme and University Selection", description: "Identify suitable programmes and institutions based on your goals and eligibility." },
  { title: "Document Preparation", description: "Prepare academic transcripts, certificates and supporting documents." },
  { title: "Application Submission", description: "Submit your application to the chosen institution with required documents." },
  { title: "Admission Decision", description: "The receiving institution reviews your application and makes its own admission decision." },
  { title: "Tuition Payment", description: "If admitted, arrange tuition payment according to the institution's instructions." },
  { title: "Visa-Document Preparation", description: "Prepare the documents typically required for a student visa application." },
  { title: "Pre-Departure Guidance", description: "Receive practical guidance to prepare for travel and studying abroad." },
  { title: "Travel Preparation", description: "Finalise travel arrangements ahead of your departure." },
];

export default function ApplicationProcessPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/study-abroad/application-process", title: "Study Abroad Application Process", description: "Step-by-step study-abroad application process." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Study Abroad", path: "/study-abroad" },
            { name: "Application Process", path: "/study-abroad/application-process" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }, { name: "Application Process", path: "/study-abroad/application-process" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Study Abroad Application Process</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            A clear step-by-step overview of how Carolina Academy supports your study-abroad journey, from first
            conversation to travel preparation.
          </p>
          <div className="mt-6"><LastUpdated date="2026-08-04" /></div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Step by Step" title="The Process" />
          <ol className="mt-10 flex flex-col gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5 rounded-2xl border border-border bg-white p-6 shadow-soft">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-heading text-base font-bold text-navy">{step.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container max-w-3xl">
          <DisclaimerBox title="Important disclaimer">
            This process describes how Carolina Academy supports applicants — it does not guarantee admission,
            visa approval or any other outcome. Admission decisions rest solely with the receiving institution,
            and visa decisions rest solely with the relevant government authority. Steps, requirements and
            timelines may vary by university and programme.
          </DisclaimerBox>
        </div>
      </section>
    </>
  );
}
