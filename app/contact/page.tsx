import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactCard } from "@/components/cards/ContactCard";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { organisation } from "@/content/organisation";
import { getFaqsByTopic } from "@/content/faqs";
import { whatsappMessages } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact Carolina Academy | Chilaw, Sri Lanka",
  description:
    "Contact Carolina Academy for course enquiries and study-abroad consultations. Address, phone, email, opening hours, map and contact form for Chilaw, Sri Lanka.",
  path: "/contact",
});

export default function ContactPage() {
  const faqs = getFaqsByTopic("contact");

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/contact", title: "Contact Carolina Academy", description: "Contact details for Carolina Academy." })} />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Contact Carolina Academy</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Reach out for course enquiries, study-abroad consultations or general questions. Our team responds
            during business hours, Monday to Saturday.
          </p>
          <div className="mt-8">
            <WhatsAppButton message={whatsappMessages.general} source="contact-hero" label="Message Us on WhatsApp" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ContactCard />
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <h3 className="font-heading text-base font-bold text-navy">What Can We Help With?</h3>
                <ul className="flex flex-col gap-2 text-sm text-ink-muted">
                  <li>
                    <Link href="/courses" className="font-semibold text-royal hover:underline">Course enquiries</Link> — ask about active and upcoming programmes.
                  </li>
                  <li>
                    <Link href="/study-abroad" className="font-semibold text-royal hover:underline">Study-abroad consultations</Link> — discuss South Korea study options.
                  </li>
                  <li>
                    <Link href="/apply" className="font-semibold text-royal hover:underline">Apply Now</Link> — start a course application or eligibility assessment.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-base font-bold text-navy">Social</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Official social media links will be added here once confirmed by Carolina Academy.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <MapEmbed />
            <p className="mt-3 text-xs text-ink-muted">{organisation.address.full}</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Send a Message" title="Contact Form" align="center" />
          <Card className="mt-10">
            <CardContent className="p-6 sm:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Contact Questions" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
