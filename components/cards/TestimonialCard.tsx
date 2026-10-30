import Image from "next/image";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Testimonial } from "@/types/testimonial";

const consentBadge = {
  "sample-content": { variant: "warning", label: "Sample Content" },
  "draft-pending-approval": { variant: "warning", label: "Draft – Pending Student Approval" },
  "consent-on-file": null,
} as const;

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const badge = consentBadge[testimonial.consentStatus];
  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
        <p className="flex-1 text-sm leading-relaxed text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="flex items-center gap-3 border-t border-border pt-4">
          {testimonial.photo ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-soft">
              <Image src={testimonial.photo.src} alt={testimonial.photo.alt} fill className="object-cover" />
            </div>
          ) : null}
          <div>
            <p className="font-heading text-sm font-bold text-navy">{testimonial.studentName}</p>
            <p className="text-xs text-ink-muted">{testimonial.programme}</p>
          </div>
        </div>
        {badge ? (
          <Badge variant={badge.variant} className="self-start">
            {badge.label}
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}
