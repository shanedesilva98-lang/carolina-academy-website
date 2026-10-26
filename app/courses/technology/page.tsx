import { Zap, Flame, Wind, Waves, Snowflake } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Technology Faculty | Refrigeration & Welding Training | Carolina Academy",
  description:
    "Carolina Academy's Technology faculty, covering Refrigeration & Air Conditioning Mechanic NVQ Level 3/4 and Electric Arc, Gas, MIG and TIG welding, with clearly labelled active, upcoming and under-development programmes.",
  path: "/courses/technology",
});

const refrigeration = getCourseBySlug("refrigeration-air-conditioning-mechanic-nvq-level-3-4");
const arcWelding = getCourseBySlug("electric-arc-welding");
const gasWelding = getCourseBySlug("gas-welding");
const migWelding = getCourseBySlug("mig-welding");
const tigWelding = getCourseBySlug("tig-welding");

export default function TechnologyPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/courses/technology", title: "Technology Faculty", description: "Carolina Academy's Technology faculty: refrigeration and air conditioning, and welding training." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Technology", path: "/courses/technology" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Courses", path: "/courses" }, { name: "Technology", path: "/courses/technology" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Technology Faculty</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy is developing a Technology faculty focused on technical trades, including
            refrigeration and air conditioning and welding. Each programme below is clearly labelled by its
            current status.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container" id="refrigeration-air-conditioning">
          <SectionHeading eyebrow="Refrigeration & Air Conditioning" title="Building Services Trade Skills" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            A planned NVQ Level 3/4 programme for the installation, servicing and fault-finding of refrigeration
            and air-conditioning systems. Programme details, NVQ and TVEC registration status, entry requirements
            and start dates are being finalised.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {refrigeration ? (
              <FacultyCard
                title="Refrigeration & Air Conditioning Mechanic NVQ Level 3/4"
                description={refrigeration.overview}
                status={refrigeration.status}
                icon={Snowflake}
                image={refrigeration.featuredImage}
                href={`/courses/${refrigeration.slug}`}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container" id="welding">
          <SectionHeading eyebrow="Welding Training" title="Building Technical Trade Skills" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            Planned welding training references positions from 3G to 6G, covering flat, horizontal, vertical and
            overhead welding techniques across multiple welding methods. Programme details, entry requirements
            and start dates are being finalised.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {arcWelding ? (
              <FacultyCard title="Electric Arc Welding" description={arcWelding.overview} status={arcWelding.status} icon={Zap} image={arcWelding.featuredImage} href={`/courses/${arcWelding.slug}`} />
            ) : null}
            {gasWelding ? (
              <FacultyCard title="Gas Welding" description={gasWelding.overview} status={gasWelding.status} icon={Flame} image={gasWelding.featuredImage} href={`/courses/${gasWelding.slug}`} />
            ) : null}
            {migWelding ? (
              <FacultyCard title="MIG Welding" description={migWelding.overview} status={migWelding.status} icon={Wind} image={migWelding.featuredImage} href={`/courses/${migWelding.slug}`} />
            ) : null}
            {tigWelding ? (
              <FacultyCard title="TIG Welding" description={tigWelding.overview} status={tigWelding.status} icon={Waves} image={tigWelding.featuredImage} href={`/courses/${tigWelding.slug}`} />
            ) : null}
          </div>

          <DisclaimerBox variant="info" className="mt-10 max-w-2xl">
            Welding position references (3G–6G) describe standard industry welding positions and are provided for
            context. They do not represent a confirmed curriculum until the programme is marked Active.
          </DisclaimerBox>
        </div>
      </section>
    </>
  );
}
