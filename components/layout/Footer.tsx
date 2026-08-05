import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { organisation, locations } from "@/content/organisation";
import { footerExplore, footerSupport, footerLegal } from "@/components/layout/nav-data";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2.5">
            <Image src="/logos/carolina-academy-icon.png" alt="" width={40} height={40} />
            <Image
              src="/logos/carolina-academy-wordmark.png"
              alt="Carolina Academy"
              width={190}
              height={54}
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed text-white/70">{organisation.legalDescription}</p>
          <p className="mt-4 text-xs font-semibold text-gold">{organisation.tvec.displayText}</p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Explore</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerExplore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Support</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerSupport.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm">
            {locations.map((location) => (
              <li key={location.id} className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  <Link href={`/locations/${location.slug}`} className="font-semibold text-white transition-colors hover:text-gold">
                    {location.name}
                  </Link>
                  <br />
                  {location.full}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={organisation.telephoneHref} className="transition-colors hover:text-gold">
                {organisation.telephone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={organisation.emailHref} className="transition-colors hover:text-gold">
                {organisation.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {organisation.openingHours.days}
                <br />
                {organisation.openingHours.hours}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Carolina Academy. All rights reserved. Established {organisation.foundingDate}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
