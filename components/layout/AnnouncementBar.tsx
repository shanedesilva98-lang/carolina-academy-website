import { Phone, Mail, Clock } from "lucide-react";
import { organisation } from "@/content/organisation";

export function AnnouncementBar() {
  return (
    <div className="hidden bg-navy text-white md:block">
      <div className="container flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            href={organisation.telephoneHref}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5" />
            {organisation.telephone}
          </a>
          <a
            href={organisation.emailHref}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Mail className="h-3.5 w-3.5" />
            {organisation.email}
          </a>
          <span className="flex items-center gap-1.5 text-white/80">
            <Clock className="h-3.5 w-3.5" />
            {organisation.openingHours.days}, {organisation.openingHours.hours}
          </span>
        </div>
        <p className="text-white/80">{organisation.tvec.displayText}</p>
      </div>
    </div>
  );
}
