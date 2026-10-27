import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { courseDivisions, getCoursesByCategory } from "@/content/courses";
import type { CourseCategory, CourseStatus } from "@/types/course";

interface FeaturedItem {
  title: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
  status: CourseStatus;
  /** Shown under the description. Omitted when everything in the card is active. */
  note?: string;
}

const UPCOMING_NOTE = "Upcoming – Details subject to confirmation";

const divisionImages: Record<CourseCategory, { src: string; alt: string }> = {
  hospitality: {
    src: "/images/courses/hospitality-front-office.jpg",
    alt: "Two hospitality students in business attire speaking with a hotel front-desk staff member in a resort lobby",
  },
  technology: {
    src: "/images/courses/welding-training.jpg",
    alt: "Two welders wearing protective masks and gloves working on a metal workpiece with sparks flying",
  },
  "health-sciences": {
    src: "/images/courses/health-sciences-caregiver.jpg",
    alt: "Two caregivers in scrubs holding the hands of a smiling elderly woman in a bright care setting, with a colleague looking on",
  },
  "foreign-employment": {
    src: "/images/courses/lifeguard-pool-rescue.jpg",
    alt: "A lifeguard in a red top supporting a casualty on a rescue tube in a resort swimming pool while an instructor and two lifeguards holding rescue tubes look on",
  },
};

/**
 * The four vocational divisions, built from the same data as the Courses page so
 * the two never drift apart. A division's badge reflects its most advanced
 * programme: Active if any programme is running, otherwise Upcoming, otherwise
 * Under Development.
 */
const divisionItems: FeaturedItem[] = courseDivisions.map((division) => {
  const programmes = getCoursesByCategory(division.id);
  const hasActive = programmes.some((course) => course.status === "active");
  const hasUpcoming = programmes.some((course) => course.status === "upcoming");
  const status: CourseStatus = hasActive ? "active" : hasUpcoming ? "upcoming" : "under-development";
  const hasInactive = programmes.some((course) => course.status !== "active");

  return {
    title: division.label,
    description: division.description,
    href: division.href,
    image: divisionImages[division.id],
    status,
    note: hasActive ? (hasInactive ? "Other programmes are upcoming – details subject to confirmation" : undefined) : UPCOMING_NOTE,
  };
});

const studyAbroadItems: FeaturedItem[] = [
  {
    title: "Korean Language & Study Pathways",
    description: "Language preparation pathways toward Korean-medium degree study.",
    href: "/study-abroad/south-korea#korean-language",
    image: {
      src: "/images/pathways/korean-language-class.jpg",
      alt: "A teacher writing Korean greetings in Hangul on a whiteboard while four adult learners follow along with workbooks in a classroom with a Korean flag on the wall",
    },
    status: "upcoming",
    note: UPCOMING_NOTE,
  },
  {
    title: "Undergraduate Study in South Korea",
    description: "Guidance for Sri Lankan students pursuing bachelor's degrees in South Korea.",
    href: "/study-abroad/south-korea#undergraduate",
    image: {
      src: "/images/pathways/korean-university-robotics-lab.jpg",
      alt: "Four international students building a small robot car together in a university lab, with a Korean flag on a shelf and the Seoul skyline through the window",
    },
    status: "upcoming",
    note: UPCOMING_NOTE,
  },
];

const featured: FeaturedItem[] = [...divisionItems, ...studyAbroadItems];

const statusBadge = {
  active: "active",
  upcoming: "upcoming",
  "under-development": "requires-confirmation",
} as const;

export function FeaturedProgrammes() {
  return (
    <section className="bg-surface-off py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Programmes"
          title="Where Students Start"
          description="Carolina Academy's four vocational training divisions and South Korea study pathways. Status is always shown clearly."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <FadeIn key={item.href} delay={index * 0.05}>
              <Card className="group relative isolate flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute left-3 top-3">
                    <VerificationBadge kind={statusBadge[item.status]} />
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-heading text-lg font-bold text-navy">
                    <Link href={item.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-muted">{item.description}</p>
                  {item.note ? <p className="mt-auto text-xs font-semibold text-warning">{item.note}</p> : null}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
