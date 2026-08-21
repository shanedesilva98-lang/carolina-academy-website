import Link from "next/link";
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
    "Guidance on South Korea D-2 and D-4-1 student visa categories, required documents and the process, with clear disclaimers that visa decisions rest with Korean immigration authorities.",
  path: "/study-abroad/south-korea/visa-guidance",
});

const visaTypes = [
  {
    code: "D-2",
    title: "D-2 Student Visa",
    description: "Generally associated with degree-level study (Bachelor's, Master's or Doctoral) at a Korean university. Exact eligibility criteria are set by Korean immigration authorities.",
  },
  {
    code: "D-4-1",
    title: "D-4-1 Korean Language Study Visa",
    description: "Generally associated with Korean-language training programmes ahead of degree study. Exact eligibility criteria are set by Korean immigration authorities. (D-4 has other sub-categories not covered on this page.)",
  },
];

interface ChecklistItem {
  text: string;
  conditional?: boolean;
}

interface VisaChecklist {
  code: string;
  title: string;
  subtitle: string;
  items: ChecklistItem[];
  visaFee: string;
  validityNote: string;
}

/**
 * Sourced from the Republic of Korea Visa Requirements Checklist forms used
 * for D-2 (Study) and D-4-1 (Korean Language Study) applications. Rules and
 * document requirements can change — see the disclaimer above and below.
 */
const visaChecklists: VisaChecklist[] = [
  {
    code: "D-2",
    title: "D-2 Study Visa — Document Checklist",
    subtitle: "Bachelor's, Master's and Doctoral degree study",
    validityNote: "Documents must generally be valid or issued within 3 months of application, unless noted otherwise.",
    visaFee: "USD 60 (subject to change — confirm the current fee with the embassy)",
    items: [
      { text: "Completed visa application form" },
      { text: "Passport-size photograph taken within the last 6 months" },
      { text: "Original valid passport (valid for more than 6 months) and any previous passports" },
      { text: "Copy of the passport's biographic data page" },
      { text: "Copy of immigration record for Korea and OECD countries (passport visa pages)", conditional: true },
      { text: "Photocopy of both sides of National ID card" },
      { text: "Photocopy of birth certificate with English translation" },
      { text: "Cover letter stating the purpose and study plan in Korea" },
      { text: "Letter issued and stamped by the Dean of the applicant's current school", conditional: true },
      { text: "Degree certificates and academic transcripts, certified by the Ministry of Foreign Affairs of Sri Lanka" },
      {
        text: "Personal bank account statement with a bank manager's balance confirmation letter (original, covering the last 3 months, issued within 14 days). If submitting a parent's statement instead, include the parent's letter and a copy of their ID.",
      },
      {
        text: "Medical report for Tuberculosis diagnosis from a designated hospital, including chest X-ray, sputum examination, tuberculin skin test and the doctor's letter",
      },
      { text: "Police report covering from date of birth to present, issued by Sri Lanka Police" },
      { text: "Photocopy of Certificate of Admission with payment receipt from the Korean institution" },
      { text: "Letter specifying the applicant's scholastic aptitude and financial capability from the Korean university", conditional: true },
      {
        text: "Korean-track applicants: official TOPIK score report (Level 3 or higher). English-track applicants: official TOEIC, TOEFL or IELTS score certificate.",
      },
    ],
  },
  {
    code: "D-4-1",
    title: "D-4-1 Korean Language Study Visa — Document Checklist",
    subtitle: "Korean-language training programmes",
    validityNote: "Documents must generally be valid or issued within 3 months of application, unless noted otherwise.",
    visaFee: "USD 60 (subject to change — confirm the current fee with the embassy)",
    items: [
      { text: "Completed visa application form" },
      { text: "Passport-size photograph taken within the last 6 months" },
      { text: "Original valid passport (valid for more than 6 months) and any previous passports" },
      { text: "Copy of the passport's biographic data page" },
      { text: "Copy of immigration record for Korea and OECD countries (passport visa pages)", conditional: true },
      { text: "Photocopy of both sides of National ID card" },
      { text: "Photocopy of birth certificate with English translation" },
      { text: "Cover letter stating the purpose and study plan in Korea" },
      {
        text: "Original academic transcripts (A/L and O/L certificates) and school records, with English translation certified by the Ministry of Foreign Affairs of Sri Lanka, plus a photocopy",
      },
      {
        text: "Personal bank account statement with a bank manager's balance confirmation letter (original, covering the last 3 months, issued within 14 days). If submitting a parent's statement instead, include the parent's letter and a copy of their ID.",
      },
      {
        text: "Medical report for Tuberculosis diagnosis from a designated hospital, including chest X-ray, sputum examination, tuberculin skin test and the doctor's letter",
      },
      { text: "Police report covering from date of birth to present, issued by Sri Lanka Police" },
      { text: "Photocopy of Certificate of Admission with payment receipt from the Korean institution" },
      { text: "English essay test, completed after the visa application is submitted" },
    ],
  },
];

export default function VisaGuidancePage() {
  const faqs = getFaqsByTopic("visa");

  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/study-abroad/south-korea/visa-guidance", title: "South Korea Student Visa Guidance", description: "Guidance on South Korea D-2 and D-4-1 student visas." }),
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
            General information on South Korea&apos;s D-2 and D-4-1 student visa categories to help you understand what
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
          <SectionHeading eyebrow="Visa Categories" title="D-2 and D-4-1 Student Visas" />
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

      <section id="document-checklists" className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Documentation"
            title="What Documents Are Required?"
            description="Based on the Republic of Korea Visa Requirements Checklist for D-2 (Study) and D-4-1 (Korean Language Study) applications. Requirements can change without notice — treat this as a starting point, not a final list."
          />
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            These are the documents the embassy asks for when you apply for the visa itself. Before that, your
            chosen university will ask for its own set of admission documents — see an{" "}
            <Link href="/study-abroad/south-korea#university-documents" className="font-semibold text-royal hover:underline">
              example university document checklist
            </Link>
            .
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {visaChecklists.map((checklist) => (
              <Card key={checklist.code}>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <VerificationBadge kind="official-source" />
                    <LastUpdated date="2026-08-21" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">{checklist.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{checklist.subtitle}</p>
                  </div>
                  <ol className="flex flex-col gap-2.5 text-sm text-ink-muted">
                    {checklist.items.map((item, index) => (
                      <li key={item.text} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-soft text-xs font-bold text-royal">
                          {index + 1}
                        </span>
                        <span>
                          {item.text}
                          {item.conditional ? <span className="ml-1.5 text-xs font-semibold text-royal">(if applicable)</span> : null}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-2 rounded-xl border border-border bg-surface-off p-4 text-xs leading-relaxed text-ink-muted">
                    <p><span className="font-semibold text-navy">Visa fee:</span> {checklist.visaFee}</p>
                    <p className="mt-1">{checklist.validityNote}</p>
                    <p className="mt-1">
                      Source: Republic of Korea Visa Requirements Checklist ({checklist.code}). Always verify the
                      current list directly with the Embassy of the Republic of Korea before applying.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <DisclaimerBox title="Read before relying on this page" className="mt-10">
            Visa requirements vary by applicant, institution and current immigration policy, and embassy and
            immigration rules may change at any time. Final decisions on any visa application are made solely by
            the relevant Korean immigration or embassy authority — not by Carolina Academy. Always confirm the
            latest requirements directly with the Embassy of the Republic of Korea or the Korea Immigration
            Service before making plans or submitting an application.
          </DisclaimerBox>
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
