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
import { locations } from "@/content/organisation";
import { getFaqsByTopic } from "@/content/faqs";
import { whatsappMessages } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, localBusinessSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact Carolina Academy | Chilaw & Katunayake, Sri Lanka",
  description:
    "Contact Carolina Academy for course enquiries and study-abroad consultations. Address, phone, email, opening hours, map and contact form for our Chilaw Hospitality Training Center and Katunayake Study Abroad Office.",
  path: "/contact",
});

export default function ContactPage() {
  const faqs = getFaqsByTopic("contact");

  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/contact", title: "Contact Carolina Academy", description: "Contact details for Carolina Academy." }),
          ...locations.map((location) => localBusinessSchema(location)),
        ]}
      />
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
        <div className="container">
          <SectionHeading
            eyebrow="Two Locations"
            title="Visit Us"
            description="Practical training and study-abroad guidance happen at two different Carolina Academy locations — visit whichever matches your enquiry."
          />
          <div className="mt-10 flex flex-col gap-16">
            {locations.map((location) => (
              <div key={location.id} className="grid grid-cols-1 gap-10 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <ContactCard location={location} />
                </div>
                <div className="lg:col-span-3">
                  <MapEmbed location={location} />
                  <p className="mt-3 text-xs text-ink-muted">{location.full}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-3 p-6">
              <h3 className="font-heading text-base font-bold text-navy">What Can We Help With?</h3>
              <ul className="flex flex-col gap-2 text-sm text-ink-muted">
                <li>
                  <Link href="/courses" className="font-semibold text-royal hover:underline">Course enquiries</Link> — ask about active and upcoming programmes, handled at the Hospitality Training Center.
                </li>
                <li>
                  <Link href="/study-abroad" className="font-semibold text-royal hover:underline">Study-abroad consultations</Link> — discuss South Korea study options at the Study Abroad Office.
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
      </section>

      <section className="py-16 sm:py-20">
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
