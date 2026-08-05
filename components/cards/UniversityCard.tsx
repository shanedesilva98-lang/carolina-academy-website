import { ExternalLink, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { partnershipStatusLabels } from "@/content/universities";
import type { University } from "@/types/university";

export function UniversityCard({ university }: { university: University }) {
  const badgeVariant =
    university.relationshipStatus === "confirmed-partner"
      ? "success"
      : university.relationshipStatus === "application-support-available"
        ? "soft"
        : "outline";

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-navy">{university.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
              <MapPin className="h-3.5 w-3.5" /> {university.city}, {university.country}
            </p>
          </div>
          <Badge variant={badgeVariant} className="shrink-0">
            {partnershipStatusLabels[university.relationshipStatus]}
          </Badge>
        </div>

        <p className="text-sm text-ink-muted">{university.description}</p>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-ink-muted">
          <div>
            <dt className="font-semibold text-navy">Programme types</dt>
            <dd>{university.programmeTypes.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Intakes</dt>
            <dd>{university.intakes.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Tuition range</dt>
            <dd>{university.tuitionRange}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Language requirements</dt>
            <dd>{university.languageRequirements.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-ink-muted">
          <span>
            Last verified: {university.lastVerifiedAt ?? "Not yet verified"}
          </span>
          {university.website ? (
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
            >
              Official website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
