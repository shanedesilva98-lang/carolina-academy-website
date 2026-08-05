import Link from "next/link";
import { ChefHat, UtensilsCrossed, ConciergeBell, BedDouble, Soup, Utensils } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/content/courses";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Hospitality Courses | Carolina Academy",
  description:
    "Explore Carolina Academy's hospitality training, including Pastry & Bakery, Food & Beverage Service, Steward Training, Housekeeping and cookery programmes, delivered at Carolina Beach Resort.",
  path: "/courses/hospitality",
});

const pastry = getCourseBySlug("pastry-bakery-nvq-level-3-4");
const foodBeverage = getCourseBySlug("food-and-beverage-service");
const steward = getCourseBySlug("steward-training");
const housekeeping = getCourseBySlug("housekeeping");
const internationalCookery = getCourseBySlug("international-cookery");
const nationalCookery = getCourseBySlug("national-cookery");

export default function HospitalityPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          webPageSchema({ path: "/courses/hospitality", title: "Hospitality Courses", description: "Carolina Academy's hospitality training programmes." }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Hospitality", path: "/courses/hospitality" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Courses", path: "/courses" }, { name: "Hospitality", path: "/courses/hospitality" }]} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Hospitality Training</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Carolina Academy&apos;s hospitality faculty combines practical industry training with hotel-based exposure
            at our Hospitality Training Center, Carolina Beach Resort, preparing students for entry-level careers
            across pastry, food service and accommodation operations.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Hospitality Education" title="Career Preparation Through Practical Training" />
          <p className="mt-4 max-w-3xl text-ink-muted leading-relaxed">
            Each hospitality programme combines structured learning with practical, hotel-based exposure. Only
            programmes marked <strong>Active Programme</strong> below are currently accepting applications — all
            others are shown for transparency about Carolina Academy&apos;s growing hospitality faculty.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastry ? (
              <FacultyCard
                id="pastry-bakery"
                title="Pastry & Bakery"
                description={pastry.overview}
                status={pastry.status}
                icon={ChefHat}
                image={pastry.featuredImage}
              />
            ) : null}
            {foodBeverage ? (
              <FacultyCard
                id="food-beverage-service"
                title="Food & Beverage Service"
                description={foodBeverage.overview}
                status={foodBeverage.status}
                icon={UtensilsCrossed}
                image={foodBeverage.featuredImage}
              />
            ) : null}
            {steward ? (
              <FacultyCard
                id="steward-training"
                title="Steward Training"
                description={steward.overview}
                status={steward.status}
                icon={ConciergeBell}
                image={steward.featuredImage}
              />
            ) : null}
            {housekeeping ? (
              <FacultyCard
                id="housekeeping"
                title="Housekeeping"
                description={housekeeping.overview}
                status={housekeeping.status}
                icon={BedDouble}
                image={housekeeping.featuredImage}
              />
            ) : null}
            {internationalCookery ? (
              <FacultyCard
                id="international-cookery"
                title="International Cookery"
                description={internationalCookery.overview}
                status={internationalCookery.status}
                icon={Soup}
                image={internationalCookery.featuredImage}
              />
            ) : null}
            {nationalCookery ? (
              <FacultyCard
                id="national-cookery"
                title="National Cookery"
                description={nationalCookery.overview}
                status={nationalCookery.status}
                icon={Utensils}
                image={nationalCookery.featuredImage}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-surface-off py-16 sm:py-20">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy">Ready to Start With Pastry & Bakery?</h2>
          <p className="max-w-xl text-ink-muted">
            Our flagship active programme has a full course page including curriculum, fees and how to apply.
          </p>
          <Button asChild size="lg" variant="primary">
            <Link href="/courses/pastry-bakery-nvq-level-3-4">View Pastry & Bakery Course</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
