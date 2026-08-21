import Link from "next/link";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Student Resources | Guides & Checklists | Carolina Academy",
  description:
    "Guides and checklists for Carolina Academy students, covering course applications, study-abroad preparation, Korea visa documents, proof of funds and pre-departure planning.",
  path: "/resources",
});

interface ResourceItem {
  title: string;
  description: string;
  available: boolean;
  href?: string;
}

const resources: ResourceItem[] = [
  { title: "Course Application Guide", description: "How to apply for a vocational course at Carolina Academy, step by step.", available: false },
  { title: "Study-Abroad Checklist", description: "A general checklist to help you prepare for a study-abroad application.", available: false },
  {
    title: "Korea Visa-Document Checklist",
    description: "Detailed D-2 and D-4-1 document checklists, based on the official Republic of Korea visa requirements forms.",
    available: true,
    href: "/study-abroad/south-korea/visa-guidance#document-checklists",
  },
  { title: "Proof-of-Funds Guide", description: "Understanding financial evidence requirements for study-abroad visa applications.", available: false },
  { title: "Academic-Document Legalisation Guide", description: "Notarisation, apostille and translation guidance for academic documents.", available: false },
  { title: "Pre-Departure Checklist", description: "Practical preparation steps before travelling to study abroad.", available: false },
];

export default function ResourcesPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/resources", title: "Student Resources", description: "Guides and checklists for Carolina Academy students." })} />
      <Breadcrumbs items={[{ name: "Student Resources", path: "/resources" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Student Resources</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Guides and checklists to help you prepare for a vocational course application or a study-abroad
            journey with Carolina Academy.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Downloads" title="Guides & Checklists" />
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            Some guides are available directly on the relevant page now (linked below); downloadable PDF versions
            of the rest are being prepared. Contact Carolina Academy directly for current guidance in the
            meantime.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const badge = (
                <Badge variant={resource.available ? "success" : "outline"} className="w-fit">
                  {resource.href ? <ArrowRight className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                  {resource.available ? (resource.href ? "View Checklist" : "Download PDF") : "Coming Soon"}
                </Badge>
              );

              return (
                <Card key={resource.title} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col gap-3 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-royal">
                      <FileText className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-base font-bold text-navy">{resource.title}</h3>
                    <p className="flex-1 text-sm text-ink-muted">{resource.description}</p>
                    {resource.href ? (
                      <Link href={resource.href} className="w-fit">
                        {badge}
                      </Link>
                    ) : (
                      badge
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" />
          <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
