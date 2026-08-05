import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { getLocation } from "@/content/organisation";
import { faqs } from "@/content/faqs";
import { whatsappMessages } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/metadata";
import { localBusinessSchema, webPageSchema } from "@/lib/schema";

const location = getLocation("katunayake");

export const metadata = buildMetadata({
  title: "Study Abroad Office in Katunayake | Carolina Academy",
  description:
    "Carolina Academy's Study Abroad Office at 1665/A, 1st Floor, Colombo Road, Kurana, Katunayake, Sri Lanka — address, opening hours, directions and study-abroad services available at this location.",
  path: "/locations/katunayake",
});

const locationFaqIds = ["how-to-contact-carolina-academy", "study-abroad-what-does-carolina-academy-do", "difference-between-carolina-academy-locations"];
const locationFaqs = faqs.filter((faq) => locationFaqIds.includes(faq.id));

const services = [
  { label: "Study Abroad Overview", href: "/study-abroad", description: "How Carolina Academy supports your study-abroad journey" },
  { label: "Study in South Korea", href: "/study-abroad/south-korea", description: "University degrees, Korean-language pathways and career-focused study" },
  { label: "Application Process", href: "/study-abroad/application-process", description: "Step-by-step guidance from consultation to departure" },
  { label: "Visa Guidance", href: "/study-abroad/south-korea/visa-guidance", description: "D-2 / D-4 visa information and disclaimers" },
  { label: "Book a Consultation", href: "/apply", description: "Start an eligibility assessment or book a consultation" },
];

export default function KatunayakeLocationPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          localBusinessSchema(location),
          webPageSchema({ path: "/locations/katunayake", title: "Study Abroad Office in Katunayake", description: "Carolina Academy's Study Abroad Office in Katunayake." }),
        ]}
      />
      <Breadcrumbs items={[{ name: "Study Abroad Office — Katunayake", path: "/locations/katunayake" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Study Abroad Office</p>
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Study Abroad Office in Katunayake</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy&apos;s Study Abroad Office in Katunayake is a consultation office for university
            applications, study-abroad guidance and visa-document support — including our South Korea study
            pathways.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-white/60">
            Looking for hands-on vocational training instead? Visit our{" "}
            <Link href="/locations/chilaw" className="font-semibold text-gold hover:underline">
              Hospitality Training Center in Chilaw
            </Link>
            .
          </p>
          <div className="mt-8">
            <WhatsAppButton message={whatsappMessages.southKorea} source="katunayake-hero" label="Message the Study Abroad Office" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="font-heading font-bold text-navy">Address</p>
                  <p className="text-sm text-ink-muted">{location.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="font-heading font-bold text-navy">Opening Hours</p>
                  <p className="text-sm text-ink-muted">
                    {location.openingHours.days}
                    <br />
                    {location.openingHours.hours}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <a href={location.telephoneHref} className="text-sm text-royal hover:underline">
                  {location.telephone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <a href={location.emailHref} className="text-sm text-royal hover:underline">
                  {location.email}
                </a>
              </div>
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
            <MapEmbed location={location} />
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="This Location" title="About This Office" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            The Katunayake office provides consultation space for study-abroad guidance appointments — university
            and programme selection, application support, document preparation and visa-document preparation
            support. It does not deliver hands-on vocational training; practical courses are conducted at the{" "}
            <Link href="/locations/chilaw" className="font-semibold text-royal hover:underline">
              Hospitality Training Center in Chilaw
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Services" title="Services Available at This Location" />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="block rounded-xl border border-border bg-white p-4 text-sm font-medium text-navy hover:border-royal hover:text-royal"
                >
                  {service.label}
                  <span className="mt-1 block text-xs font-normal text-ink-muted">{service.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Nearby" title="Nearby Landmarks" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            Katunayake is home to Bandaranaike International Airport (BIA), Sri Lanka&apos;s main international
            gateway — convenient for students preparing for departure. Specific directions from major landmarks
            will be added here once confirmed.
          </p>
        </div>
      </section>

      {locationFaqs.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="container max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Location Questions" align="center" />
            <div className="mt-10 rounded-2xl border border-border bg-white px-6 shadow-soft">
              <FAQAccordion items={locationFaqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
