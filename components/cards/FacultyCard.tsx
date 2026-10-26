import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import type { CourseStatus } from "@/types/course";

interface FacultyCardProps {
  id?: string;
  title: string;
  description: string;
  status: CourseStatus;
  icon: LucideIcon;
  image?: { src: string; alt: string };
  /** When set, the whole card links to the programme's detail page. */
  href?: string;
}

const statusToBadge: Record<CourseStatus, "active" | "upcoming" | "requires-confirmation"> = {
  active: "active",
  upcoming: "upcoming",
  "under-development": "requires-confirmation",
};

export function FacultyCard({ id, title, description, status, icon: Icon, image, href }: FacultyCardProps) {
  return (
    <Card id={id} className="group relative isolate scroll-mt-28 overflow-hidden transition-shadow hover:shadow-lift">
      {image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-soft">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
      ) : null}
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-soft text-royal">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <VerificationBadge kind={statusToBadge[status]} />
        </div>
        <h3 className="font-heading text-lg font-bold text-navy">
          {href ? (
            <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
              <span className="absolute inset-0" aria-hidden="true" />
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        {href ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal" aria-hidden="true">
            View programme details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
