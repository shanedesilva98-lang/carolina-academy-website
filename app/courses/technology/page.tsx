import { Zap, Flame, Wind, Waves } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Technology Faculty | Welding Training | Carolina Academy",
  description:
    "Carolina Academy's Technology faculty, covering Electric Arc, Gas, MIG and TIG welding training, with clearly labelled active, upcoming and under-development programmes.",
  path: "/courses/technology",
});

const arcWelding = getCourseBySlug("electric-arc-welding");
const gasWelding = getCourseBySlug("gas-welding");
const migWelding = getCourseBySlug("mig-welding");
const tigWelding = getCourseBySlug("tig-welding");

export default function TechnologyPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/courses/technology", title: "Technology Faculty", description: "Carolina Academy's Technology faculty and welding training." }),
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
            Carolina Academy is developing a Technology faculty focused on technical trades, beginning with
            welding. Each programme below is clearly labelled by its current status.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container" id="welding">
          <SectionHeading eyebrow="Welding Training" title="Building Technical Trade Skills" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            Planned welding training references positions from 3G to 6G, covering flat, horizontal, vertical and
            overhead welding techniques across multiple welding methods. Programme details, entry requirements
            and start dates are being finalised.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {arcWelding ? (
              <FacultyCard title="Electric Arc Welding" description={arcWelding.overview} status={arcWelding.status} icon={Zap} image={arcWelding.featuredImage} />
            ) : null}
            {gasWelding ? (
              <FacultyCard title="Gas Welding" description={gasWelding.overview} status={gasWelding.status} icon={Flame} image={gasWelding.featuredImage} />
            ) : null}
            {migWelding ? (
              <FacultyCard title="MIG Welding" description={migWelding.overview} status={migWelding.status} icon={Wind} image={migWelding.featuredImage} />
            ) : null}
            {tigWelding ? (
              <FacultyCard title="TIG Welding" description={tigWelding.overview} status={tigWelding.status} icon={Waves} image={tigWelding.featuredImage} />
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
