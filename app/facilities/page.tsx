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
    images: [{ src: "/images/facilities/food-safety-classroom.jpg", alt: "A woman instructor standing beside a whiteboard and a Food Safety slide while a classroom of students in white shirts watches from wooden desks" }],
  },
  {
    title: "Practical Training Kitchen",
    description: "A dedicated kitchen space for hands-on pastry, bakery and culinary practice.",
    images: [{ src: "/images/facilities/culinary-training-pot.jpg", alt: "A chef instructor in a black jacket stirring a large pot while four trainees in white shirts and chef hats watch in a commercial kitchen" }, { src: "/images/facilities/oven-training-session.jpg", alt: "A chef instructor in oven gloves sliding a tray into a deck oven while a trainee in a chef hat stands by holding a covered baking tray" }],
  },
  {
    title: "Hospitality Training Center — Carolina Beach Resort",
    description: "Practical training takes place within the working hospitality environment at Carolina Beach Resort, Ambakandawila Road, Chilaw.",
    images: [{ src: "/images/facilities/carolina-beach-resort.jpg", alt: "Carolina Beach Resort, home of Carolina Academy's Hospitality Training Center" }],
  },
  {
    title: "Consultation Areas",
    description: "Dedicated spaces for one-on-one study-abroad and course guidance sessions, primarily at the Study Abroad Office in Katunayake.",
    images: [{ src: "/images/facilities/consultation-office.jpg", alt: "Two students in business attire seated at a wooden desk in a one-on-one consultation with a man in a blue shirt, while a staff member in uniform stands behind holding a folder" }],
  },
  {
    title: "Future Training Facilities",
    description: "Additional facilities are planned as Carolina Academy's Technology and Health Sciences faculties develop.",
    images: [{ src: "/images/facilities/elderly-care-training.jpg", alt: "Illustration of caregiver trainees in scrubs watching an instructor take an elderly woman's blood pressure in a bright care training room" }],
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
