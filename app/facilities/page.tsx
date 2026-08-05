import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Gallery } from "@/components/shared/Gallery";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Facilities | Carolina Academy",
  description:
    "Training classrooms, the practical training kitchen and Carolina Beach Resort's hospitality environment used by Carolina Academy students in Chilaw, Sri Lanka.",
  path: "/facilities",
});

const sections = [
  {
    title: "Training Classrooms",
    description: "Classroom spaces used for theory instruction alongside practical training.",
    images: [{ src: "/images/facilities-classroom.svg", alt: "Training classroom at Carolina Academy" }],
  },
  {
    title: "Practical Training Kitchen",
    description: "A dedicated kitchen space for hands-on pastry, bakery and culinary practice.",
    images: [{ src: "/images/facilities-kitchen.svg", alt: "Practical training kitchen at Carolina Academy" }, { src: "/images/training-kitchen.svg", alt: "Students practising in the training kitchen" }],
  },
  {
    title: "Carolina Beach Resort — Hospitality Training Environment",
    description: "Practical training takes place within the working hospitality environment at Carolina Beach Resort, Ambakandawila Road, Chilaw.",
    images: [{ src: "/images/carolina-beach-resort.svg", alt: "Carolina Beach Resort, Carolina Academy's practical training venue" }],
  },
  {
    title: "Consultation Areas",
    description: "Dedicated spaces for one-on-one study-abroad and course guidance sessions.",
    images: [{ src: "/images/facilities-consultation-area.svg", alt: "Consultation area at Carolina Academy" }],
  },
  {
    title: "Future Training Facilities",
    description: "Additional facilities are planned as Carolina Academy's Technology and Health Sciences faculties develop.",
    images: [{ src: "/images/facilities-future.svg", alt: "Planned future training facilities" }],
  },
];

export default function FacilitiesPage() {
  const allImages = sections.flatMap((section) => section.images);

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/facilities", title: "Facilities", description: "Carolina Academy's training facilities." })} />
      <Breadcrumbs items={[{ name: "Facilities", path: "/facilities" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Our Facilities</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy&apos;s training takes place across classroom, practical kitchen and real hospitality
            environments at Carolina Beach Resort in Chilaw.
          </p>
        </div>
      </section>

      {sections.map((section, index) => (
        <section key={section.title} className={index % 2 === 0 ? "py-16 sm:py-20" : "bg-surface-off py-16 sm:py-20"}>
          <div className="container">
            <SectionHeading eyebrow="Facilities" title={section.title} />
            <p className="mt-4 max-w-2xl text-ink-muted">{section.description}</p>
            <div className="mt-8 max-w-2xl">
              <Gallery images={section.images} />
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title="All Facilities" />
          <div className="mt-8">
            <Gallery images={allImages} />
          </div>
          <DisclaimerBox variant="info" className="mt-10 max-w-2xl">
            Images shown are placeholders pending professional photography of Carolina Academy&apos;s actual
            facilities. See CMS_MIGRATION.md and the image migration notes in README.md for details.
          </DisclaimerBox>
        </div>
      </section>
    </>
  );
}
