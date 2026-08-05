import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Card, CardContent } from "@/components/ui/card";
import { organisation } from "@/content/organisation";
import { courses } from "@/content/courses";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/metadata";
import { localBusinessSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Carolina Academy Training Centre in Chilaw | Contact & Directions",
  description:
    "Carolina Academy's training centre at Carolina Beach Resort, Ambakandawila Road, Chilaw, Sri Lanka — address, opening hours, directions and courses available at this location.",
  path: "/locations/chilaw",
});

const locationFaqs = faqs.filter((faq) => faq.id === "where-is-carolina-academy-located" || faq.id === "how-to-contact-carolina-academy");

export default function ChilawLocationPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          localBusinessSchema(),
          webPageSchema({ path: "/locations/chilaw", title: "Carolina Academy Training Centre in Chilaw", description: "Carolina Academy's Chilaw training centre." }),
        ]}
      />
      <Breadcrumbs items={[{ name: "Chilaw Training Centre", path: "/locations/chilaw" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Carolina Academy Training Centre in Chilaw</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy&apos;s main training centre is located at Carolina Beach Resort in Chilaw, on Sri
            Lanka&apos;s west coast.
          </p>
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
                  <p className="text-sm text-ink-muted">{organisation.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <div>
                  <p className="font-heading font-bold text-navy">Opening Hours</p>
                  <p className="text-sm text-ink-muted">
                    {organisation.openingHours.days}
                    <br />
                    {organisation.openingHours.hours}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <a href={organisation.telephoneHref} className="text-sm text-royal hover:underline">
                  {organisation.telephone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
                <a href={organisation.emailHref} className="text-sm text-royal hover:underline">
                  {organisation.email}
                </a>
              </div>
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="This Location" title="Facilities at This Location" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            This training centre includes classroom facilities and a practical training kitchen within Carolina
            Beach Resort&apos;s hospitality environment. See the{" "}
            <Link href="/facilities" className="font-semibold text-royal hover:underline">
              Facilities
            </Link>{" "}
            page for a full overview.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Courses" title="Courses Available at This Location" />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {courses.map((course) => (
              <li key={course.id}>
                <Link href={`/courses/${course.slug}`} className="block rounded-xl border border-border bg-white p-4 text-sm font-medium text-navy hover:border-royal hover:text-royal">
                  {course.shortTitle}
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
            Carolina Academy is located within Carolina Beach Resort on Ambakandawila Road, Chilaw — a coastal
            town on Sri Lanka&apos;s western coast. Specific directions from major landmarks will be added here once
            confirmed.
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
