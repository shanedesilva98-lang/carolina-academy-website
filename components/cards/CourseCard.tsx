import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { courseCategoryLabels } from "@/content/courses";
import type { Course } from "@/types/course";

export function CourseCard({ course }: { course: Course }) {
  const badgeKind = course.status === "active" ? "applications-open" : course.status === "upcoming" ? "upcoming" : "requires-confirmation";

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <Image
          src={course.featuredImage.src}
          alt={course.featuredImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="absolute left-3 top-3">
          <VerificationBadge kind={badgeKind} />
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-royal">
          {courseCategoryLabels[course.category]}
        </p>
        <h3 className="font-heading text-lg font-bold leading-snug text-navy">
          <Link href={`/courses/${course.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
            <span className="absolute inset-0" aria-hidden="true" />
            {course.shortTitle}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{course.overview}</p>
        <ul className="mt-auto flex flex-col gap-1.5 text-xs text-ink-muted">
          <li className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" /> {course.qualificationLabel}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" /> Duration: {course.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {course.location}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
