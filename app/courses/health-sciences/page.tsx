import { HeartPulse, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Health Sciences Faculty | Carolina Academy",
  description:
    "Carolina Academy's Health Sciences faculty, including Caregiver Training and Nurse Assistant programmes currently under development. No medical licensing is implied.",
  path: "/courses/health-sciences",
});

const caregiver = getCourseBySlug("caregiver-training");
const nurseAssistant = getCourseBySlug("nurse-assistant-training");

export default function HealthSciencesPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/courses/health-sciences", title: "Health Sciences Faculty", description: "Carolina Academy's Health Sciences faculty." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Health Sciences", path: "/courses/health-sciences" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Courses", path: "/courses" }, { name: "Health Sciences", path: "/courses/health-sciences" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Health Sciences Faculty</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy is developing a Health Sciences faculty. Programmes below are under development —
            no enrolment is currently open, and no medical or nursing licensing claim is made.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <DisclaimerBox title="Important note on Health Sciences programmes" className="max-w-2xl">
            Caregiver and Nurse Assistant training listed below are placeholders for programmes currently under
            development. Carolina Academy does not claim medical, nursing or healthcare regulatory
            licensing/accreditation for these programmes. Details, accreditation status and start dates will be
            published once confirmed.
          </DisclaimerBox>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {caregiver ? (
              <FacultyCard title="Caregiver Training" description={caregiver.overview} status={caregiver.status} icon={HeartPulse} image={caregiver.featuredImage} />
            ) : null}
            {nurseAssistant ? (
              <FacultyCard title="Nurse Assistant" description={nurseAssistant.overview} status={nurseAssistant.status} icon={Stethoscope} image={nurseAssistant.featuredImage} />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
