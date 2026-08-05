import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, FileCheck2, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Timeline } from "@/components/shared/Timeline";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { organisation, locations } from "@/content/organisation";
import { leadership, trainers } from "@/content/team";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, personSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "About Carolina Academy | TVEC-Registered Training Institute",
  description:
    "Learn about Carolina Academy's history, vision, mission and values as a TVEC-registered vocational training institute and study-abroad consultancy in Chilaw, Sri Lanka.",
  path: "/about",
});

const timelineItems = [
  {
    year: "7 March 2023",
    title: "Carolina Academy Established",
    description: "Founded as a hospitality training institute in Chilaw, Sri Lanka.",
  },
  {
    year: "2023 – Present",
    title: "Expansion into Vocational & Technical Training",
    description: "Growth into wider technical and vocational education alongside hospitality training.",
  },
  {
    year: "Ongoing",
    title: "Study-Abroad Consultancy",
    description: "Development of study-abroad guidance services, with an initial focus on South Korea.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/about", title: "About Carolina Academy", description: "Carolina Academy's history, vision, mission and values." }),
          ...leadership.map((person) => personSchema({ name: person.name, role: person.role, bio: person.bio })),
          ...trainers.map((person) => personSchema({ name: person.name, role: person.role, bio: person.bio })),
        ]}
      />
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">About Carolina Academy</p>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">
              A Practical Institute Built for Real Careers
            </h1>
            <p className="mt-5 text-white/80">{organisation.legalDescription}</p>
            <div className="mt-6"><LastUpdated date="2026-08-04" /></div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10">
            <Image src="/images/about-overview.svg" alt="Overview of Carolina Academy's training environment" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Card>
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-bold text-navy">Our Vision</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">{organisation.vision}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-bold text-navy">Our Mission</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">{organisation.mission}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="What We Stand For" title="Our Values" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organisation.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <CheckCircle2 className="h-6 w-6 text-royal" aria-hidden="true" />
                <h3 className="mt-3 font-heading text-base font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Approach" title="Competency-Based Training" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Carolina Academy&apos;s programmes are designed around competency-based training — building practical,
              demonstrable skills rather than theoretical knowledge alone. Students practise in real or
              near-real working conditions, particularly within the hospitality environment at Carolina Beach
              Resort, so that what they learn maps directly to workplace expectations.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Beyond the Classroom" title="Study-Abroad Support" />
            <p className="mt-4 text-ink-muted leading-relaxed">
              Alongside vocational training, Carolina Academy supports students who wish to pursue higher
              education abroad — currently with a focus on South Korea. This includes guidance on university and
              programme selection, application support, document preparation, visa-document preparation support
              and pre-departure guidance. See our{" "}
              <Link href="/study-abroad" className="font-semibold text-royal hover:underline">
                Study Abroad
              </Link>{" "}
              section for details.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Our Journey" title="Timeline" />
          <div className="mt-10 max-w-2xl">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Where We Operate"
            title="Our Locations"
            description="Carolina Academy operates from two locations in Sri Lanka, each serving a different part of the student journey."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.slug}`}
                className="group rounded-2xl border border-border bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <MapPin className="h-6 w-6 text-royal" aria-hidden="true" />
                <h3 className="mt-3 font-heading text-lg font-bold text-navy group-hover:text-royal">{location.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{location.role}</p>
                <p className="mt-3 text-sm font-medium text-ink-muted">{location.full}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-ink-muted">
            Practical training takes place at the Hospitality Training Center in Chilaw, giving students exposure
            to a genuine hospitality operating environment. See the{" "}
            <Link href="/facilities" className="font-semibold text-royal hover:underline">
              Facilities
            </Link>{" "}
            page for a full overview and image gallery.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Leadership & Trainers" title="Our People" />
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">
            Full leadership and trainer profiles are being confirmed and will be published here as they become
            available.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[...leadership, ...trainers].map((person) => (
              <Card key={person.id}>
                <CardContent className="p-6">
                  <p className="font-heading font-bold text-navy">{person.name}</p>
                  <p className="text-sm text-royal">{person.role}</p>
                  <p className="mt-2 text-sm text-ink-muted">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Accreditation" title="Registration & Accreditation" />
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
            <Card className="flex-1">
              <CardContent className="flex flex-col gap-4 p-8">
                <VerificationBadge kind="verified" className="self-start" />
                <div className="flex items-start gap-3">
                  <FileCheck2 className="mt-1 h-6 w-6 shrink-0 text-royal" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">{organisation.tvec.label}</h3>
                    <p className="mt-1 text-sm text-ink-muted">Registration No. {organisation.tvec.registrationNumber}</p>
                  </div>
                </div>
                <DisclaimerBox variant="info" title="Supporting documentation">
                  Supporting TVEC registration documents will be uploaded here once available for public
                  reference. Individual course NVQ accreditation status is confirmed separately on each course
                  page.
                </DisclaimerBox>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Industry Connections" title="Working With Industry" />
          <p className="mt-4 max-w-2xl text-ink-muted">
            Carolina Academy&apos;s hospitality training is delivered in partnership with the operating environment at
            Carolina Beach Resort. Additional industry connections and partnerships will be published here once
            confirmed.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-navy">Ready to Learn More?</h2>
          <p className="max-w-xl text-ink-muted">
            Explore our courses or get in touch to discuss vocational training and study-abroad options.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
