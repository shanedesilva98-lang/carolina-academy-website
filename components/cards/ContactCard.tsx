"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { locations, type OrganisationLocation } from "@/content/organisation";
import { trackEvent } from "@/lib/analytics";

export function ContactCard({ location = locations[0] }: { location?: OrganisationLocation }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-royal">{location.name}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{location.role}</p>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Address</p>
            <p className="text-sm text-ink-muted">{location.full}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Telephone</p>
            {location.phones.map((phone) => (
              <p key={phone.href} className="text-sm">
                <a
                  href={phone.href}
                  onClick={() => trackEvent("telephone_click", { source: "contact-card", location: location.id, label: phone.label })}
                  className="text-royal hover:underline"
                >
                  {phone.number}
                </a>
                {location.phones.length > 1 ? <span className="text-ink-muted"> ({phone.label})</span> : null}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Email</p>
            <a
              href={location.emailHref}
              onClick={() => trackEvent("email_click", { source: "contact-card", location: location.id })}
              className="text-sm text-royal hover:underline"
            >
              {location.email}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
          <div>
            <p className="font-heading font-bold text-navy">Opening Hours</p>
            <p className="text-sm text-ink-muted">
              {location.openingHours.days}
              <br />
              {location.openingHours.hours}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
