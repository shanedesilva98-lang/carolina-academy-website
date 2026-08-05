import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { ApplyTabs } from "./ApplyTabs";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Apply Now | Carolina Academy",
  description:
    "Apply for a vocational course, complete a study-abroad eligibility assessment, or book a free consultation with Carolina Academy.",
  path: "/apply",
});

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; tab?: string }>;
}) {
  const { course, tab } = await searchParams;
  const defaultTab = tab || (course ? "course" : "course");

  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/apply", title: "Apply Now", description: "Apply to Carolina Academy." })} />
      <Breadcrumbs items={[{ name: "Apply Now", path: "/apply" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Apply Now</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Choose the option below that matches what you&apos;re applying for. All submissions are reviewed by
            Carolina Academy&apos;s team.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <ApplyTabs defaultTab={defaultTab} defaultCourseSlug={course} />
        </div>
      </section>
    </>
  );
}
