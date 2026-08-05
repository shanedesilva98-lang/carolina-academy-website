"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { mainNav, coursesMenu, studyAbroadMenu } from "@/components/layout/nav-data";
import { organisation } from "@/content/organisation";
import { whatsappMessages } from "@/lib/whatsapp";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const [studyOpen, setStudyOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col p-0">
        <div className="flex items-center gap-2 border-b border-border p-5">
          <Image src="/logos/carolina-academy-icon.png" alt="" width={36} height={36} />
          <SheetTitle>Carolina Academy</SheetTitle>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-5">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-surface-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="mt-2 border-t border-border pt-2">
              <button
                type="button"
                onClick={() => setCoursesOpen((v) => !v)}
                aria-expanded={coursesOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-semibold text-navy hover:bg-surface-soft"
              >
                Courses
                <ChevronDown className={`h-4 w-4 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
              </button>
              {coursesOpen ? (
                <ul className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                  {coursesMenu.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-surface-soft hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>

            <li>
              <button
                type="button"
                onClick={() => setStudyOpen((v) => !v)}
                aria-expanded={studyOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-semibold text-navy hover:bg-surface-soft"
              >
                Study Abroad
                <ChevronDown className={`h-4 w-4 transition-transform ${studyOpen ? "rotate-180" : ""}`} />
              </button>
              {studyOpen ? (
                <ul className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                  {studyAbroadMenu.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-surface-soft hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-border p-5">
          <Button asChild size="lg" variant="primary">
            <Link href="/apply" onClick={() => setOpen(false)}>
              Apply Now
            </Link>
          </Button>
          <WhatsAppButton message={whatsappMessages.general} source="mobile-menu" label="WhatsApp Us" />
          <a
            href={organisation.telephoneHref}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-navy"
          >
            <Phone className="h-4 w-4" /> {organisation.telephone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
