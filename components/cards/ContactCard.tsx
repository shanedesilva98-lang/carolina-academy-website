"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { organisation } from "@/content/organisation";
import { trackEvent } from "@/lib/analytics";

export function ContactCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 p-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Address</p>
            <p className="text-sm text-ink-muted">{organisation.address.full}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Telephone</p>
            <a
              href={organisation.telephoneHref}
              onClick={() => trackEvent("telephone_click", { source: "contact-card" })}
              className="text-sm text-royal hover:underline"
            >
              {organisation.telephone}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Email</p>
            <a
              href={organisation.emailHref}
              onClick={() => trackEvent("email_click", { source: "contact-card" })}
              className="text-sm text-royal hover:underline"
            >
              {organisation.email}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Opening Hours</p>
            <p className="text-sm text-ink-muted">
              {organisation.openingHours.days}
              <br />
              {organisation.openingHours.hours}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
