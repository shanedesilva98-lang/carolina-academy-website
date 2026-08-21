import Link from "next/link";
import Image from "next/image";
import { BookOpen, Languages, Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { UniversityCard } from "@/components/cards/UniversityCard";
import { Card, CardContent } from "@/components/ui/card";
import { StudyAbroadEligibilityForm } from "@/components/forms/StudyAbroadEligibilityForm";
import { universities } from "@/content/universities";
import { getFaqsByTopic } from "@/content/faqs";
import { whatsappMessages } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Study in South Korea from Sri Lanka | Carolina Academy",
  description:
    "Explore university degrees, Korean-language programmes and career-focused study opportunities in South Korea with step-by-step application guidance from Carolina Academy.",
  path: "/study-abroad/south-korea",
});

const pathways = [
  { id: "undergraduate", icon: BookOpen, title: "University Degree Pathway", description: "For students seeking undergraduate or postgraduate education." },
  { id: "korean-language", icon: Languages, title: "Korean Language to Degree Pathway", description: "For students who need to develop Korean-language proficiency before progressing to academic study." },
  { id: "career-focused", icon: Briefcase, title: "Career-Focused Study Pathway", description: "For students considering programmes linked to specific professional sectors." },
];

const applicationDocuments = [
  "Completed application form",
  "Academic transcripts and certificates",
  "Passport copy",
  "English or Korean language test results (where required)",
  "Financial evidence / proof of funds documentation",
  "Statement of purpose (where required)",
  "Recommendation letters (where required)",
];

interface UniversityDocItem {
  text: string;
  note?: string;
  conditional?: boolean;
}

interface UniversityChecklist {
  code: string;
  title: string;
  items: UniversityDocItem[];
}

/**
 * Example admission-document checklist from one Korean university, used to
 * illustrate what a university (as opposed to the embassy) typically asks
 * for. Every university sets its own requirements — see the disclaimer
 * rendered alongside this data. Not to be confused with the D-2/D-4-1 visa
 * document checklists on the Visa Guidance page, which are embassy
 * requirements for the visa application itself.
 */
const universityDocChecklistBase: UniversityDocItem[] = [
  { text: "Application form", note: "Original, in the prescribed format of the institution" },
  { text: "Passport-size photograph", note: "Original, 2 copies (3.5cm × 4.5cm, colour)" },
  { text: "Passport copy", note: "Copy; passport must be valid for at least 6 months" },
  {
    text: "Final educational qualification (high school or higher): graduation certificate and academic transcript",
    note: "Original, 1 copy each. Apostille or consular authentication required for countries outside the Apostille Convention. Only documents issued within 6 months of the visa application date are typically accepted.",
  },
  {
    text: "Bank balance certificate",
    note: "Original, issued within 30 days of the visa application date. The example university required the account to be in the student's name with a minimum balance of KRW 10,000,000; if using a parent's account, a family relationship certificate must also be submitted.",
  },
  {
    text: "Proof of financial capability of the financial sponsor (parents)",
    note: "Original, notarised if translated — employment certificate, business registration certificate, and salary statement or income proof, each clearly stating monthly or annual income.",
  },
  { text: "Birth certificate and family relationship certificate", note: "Original, 1 copy each; notarised if translated" },
  { text: "Identification documents (applicant and parents)", note: "Copy, 1 copy" },
  {
    text: "Korean-language proficiency certificate and gap-period supporting documents",
    note: "If more than one year has passed since graduation from the applicant's last educational institution, documents verifying that period must also be submitted.",
    conditional: true,
  },
];

const universityChecklists: UniversityChecklist[] = [
  {
    code: "D-4-1",
    title: "D-4-1 (Korean Language Program)",
    items: universityDocChecklistBase,
  },
  {
    code: "D-2",
    title: "D-2 (Degree Program)",
    items: [
      ...universityDocChecklistBase.slice(0, 8),
      {
        text: "Official TOPIK score report, or an official IELTS, TOEFL or TOEIC score certificate",
        note: "Required in addition to the documents above, for direct degree-programme applicants (Korean-medium or English-medium track).",
      },
      ...universityDocChecklistBase.slice(8),
    ],
  },
];

export default function SouthKoreaPage() {
  const faqs = getFaqsByTopic("south-korea");
  const visaFaqs = getFaqsByTopic("visa");

  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/study-abroad/south-korea", title: "Study in South Korea from Sri Lanka", description: "Study-abroad guidance for South Korea." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Study Abroad", path: "/study-abroad" },
            { name: "South Korea", path: "/study-abroad/south-korea" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Study Abroad", path: "/study-abroad" }, { name: "South Korea", path: "/study-abroad/south-korea" }]} />

      {/* Hero */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Study in South Korea from Sri Lanka</h1>
            <p className="mt-5 text-white/80">
              Explore university degrees, Korean-language programmes and career-focused study opportunities with
              step-by-step application guidance from Carolina Academy.
            </p>
            <div className="mt-6"><LastUpdated date="2026-08-04" /></div>
            <div className="mt-8">
              <WhatsAppButton message={whatsappMessages.southKorea} source="south-korea-hero" label="Ask About South Korea" />
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10">
            <Image src="/images/south-korea-campus.svg" alt="South Korea university campus" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Why South Korea */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Why Consider South Korea?" title="Why South Korea?" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            South Korea offers a range of university degree programmes, Korean-language pathways and
            career-focused study options for international students. Whether South Korea is the right fit
            depends on your academic background, budget, career goals and personal circumstances — a
            consultation with Carolina Academy can help you assess your options realistically.
          </p>
        </div>
      </section>

      {/* Pathways */}
      <section id="undergraduate" className="scroll-mt-24 bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Study Pathways" title="Available Study Pathways" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pathways.map((pathway) => (
              <Card key={pathway.id} id={pathway.id} className="scroll-mt-24">
                <CardContent className="flex flex-col gap-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
                    <pathway.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">{pathway.title}</h3>
                  <p className="text-sm text-ink-muted">{pathway.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Korean language programmes */}
      <section id="korean-language" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Language Pathway" title="Korean Language Programmes" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Students without existing Korean-language proficiency may need to complete a language programme
              before progressing to degree study. These programmes build the language skills required for
              Korean-medium university admission.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Career Pathway" title="Career-Focused Programmes" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Some students pursue study pathways linked to specific professional sectors. Carolina Academy can
              help you understand what a career-focused pathway may involve, without promising specific job or
              visa outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section id="universities" className="scroll-mt-24 bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Institutions" title="Partner & Information Universities" />
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            Carolina Academy is building relationships with South Korean institutions. Entries below are shown
            with their current relationship status and last-verified date; do not treat unverified information
            as a confirmed partnership.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {universities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>
        </div>
      </section>

      {/* Entry requirements & tests */}
      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Entry Requirements" title="What Do I Need to Apply?" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Entry requirements vary by university, programme and pathway. In general, universities assess
              academic transcripts, language proficiency and supporting documents. Carolina Academy can review
              your background and outline realistic options during a consultation.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Language Tests" title="IELTS and TOPIK Explained" />
            <div className="mt-4 flex flex-col gap-4 text-sm text-ink-muted">
              <p>
                <strong className="text-navy">IELTS</strong> is an English-language proficiency test sometimes
                required for English-medium programmes.
              </p>
              <p>
                <strong className="text-navy">TOPIK</strong> (Test of Proficiency in Korean) is the standard test
                used to assess Korean-language ability, often required for Korean-medium degree programmes.
              </p>
              <p>Confirm the exact test and score requirements with your target university.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application documents */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Documentation" title="Application Documents" />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {applicationDocuments.map((doc) => (
              <li key={doc} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4 text-sm text-ink-muted">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-royal" /> {doc}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink-muted">
            Exact document requirements vary by university and visa type. Confirm the current list with your
            target institution and the relevant embassy or immigration authority.
          </p>
        </div>
      </section>

      {/* University-specific document checklist (example) */}
      <section id="university-documents" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Example Checklist"
            title="What Does a University Ask For?"
            description="A university's own admission-document checklist is separate from the embassy's visa-document checklist — you typically submit these to the university first to receive a Certificate of Admission, then use that to apply for your visa."
          />
          <DisclaimerBox title="This is one university's checklist, not a universal standard" className="mt-8">
            The list below reflects the published admission-document requirements of one Korean university that
            Carolina Academy has worked with. It is shown as an example only — every university sets its own
            document requirements, and they can change. Always confirm the exact, current list with your specific
            target university&apos;s admissions office before preparing documents. For the separate embassy visa
            document checklist, see{" "}
            <Link href="/study-abroad/south-korea/visa-guidance#document-checklists" className="font-semibold text-royal hover:underline">
              Visa Guidance
            </Link>
            .
          </DisclaimerBox>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {universityChecklists.map((checklist) => (
              <Card key={checklist.code}>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <VerificationBadge kind="requires-confirmation" />
                    <LastUpdated date="2026-08-21" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy">{checklist.title} — Example University Requirements</h3>
                  <ol className="flex flex-col gap-3 text-sm text-ink-muted">
                    {checklist.items.map((item, index) => (
                      <li key={item.text} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-soft text-xs font-bold text-royal">
                          {index + 1}
                        </span>
                        <span>
                          <span className="font-medium text-navy">{item.text}</span>
                          {item.conditional ? <span className="ml-1.5 text-xs font-semibold text-royal">(if applicable)</span> : null}
                          {item.note ? <span className="block text-xs leading-relaxed text-ink-muted">{item.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-1 text-xs italic text-ink-muted">
                    Submitted documents are typically not returned once submitted, at this example university.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Costs */}
      <section id="costs" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Financial Planning" title="Proof-of-Funds Guidance" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Student visa applications typically require evidence that you (or a sponsor) can cover tuition and
              living costs. The exact financial evidence required varies by visa type and is set by the relevant
              immigration authority — confirm current requirements before applying.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Budgeting" title="Tuition and Living-Cost Preparation" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Tuition and living costs vary significantly by city, institution and lifestyle. Carolina Academy
              can help you understand typical cost ranges during a consultation so you can plan realistically —
              published figures should always be confirmed directly with the university.
            </p>
          </div>
        </div>
      </section>

      {/* Visa process */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Visa" title="Student Visa Process" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            South Korean student visas (commonly D-2 for degree study and D-4 for language training) involve
            document preparation, application submission and, in some cases, an interview. Processes and
            requirements can change — see our dedicated{" "}
            <Link href="/study-abroad/south-korea/visa-guidance" className="font-semibold text-royal hover:underline">
              Visa Guidance page
            </Link>{" "}
            for detail and disclaimers.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Timeline" title="Application Timeline" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            Timelines vary by university intake and visa processing times, which are outside Carolina Academy&apos;s
            control. As a general guide, allow several months between starting your application and your
            intended intake to complete documentation, application review and visa processing. See the{" "}
            <Link href="/study-abroad/application-process" className="font-semibold text-royal hover:underline">
              Application Process
            </Link>{" "}
            page for the full step-by-step process.
          </p>
        </div>
      </section>

      {/* Student support */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container flex flex-col items-center gap-4 text-center">
          <GraduationCap className="h-10 w-10 text-royal" />
          <h2 className="font-heading text-2xl font-extrabold text-navy">Ongoing Student Support</h2>
          <p className="max-w-xl text-ink-muted">
            Carolina Academy&apos;s support does not end at application submission. We provide guidance through
            document preparation, visa-document preparation and pre-departure planning.
          </p>
        </div>
      </section>

      {/* Eligibility form */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Get Started" title="Check Your Eligibility" align="center" />
          <Card className="mt-10">
            <CardContent className="p-6 sm:p-8">
              <StudyAbroadEligibilityForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="South Korea Study Questions" align="center" />
          <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
            <FAQAccordion items={[...faqs, ...visaFaqs]} />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <DisclaimerBox title="Study Abroad Disclaimer">
            Carolina Academy provides application and documentation support only. University admission decisions
            and visa decisions are made solely by the relevant institution and government authority. Employment
            eligibility while studying is controlled by applicable laws and visa conditions. Costs, requirements
            and processes may change — always confirm current information with official sources before making
            decisions.
          </DisclaimerBox>
        </div>
      </section>
    </>
  );
}
