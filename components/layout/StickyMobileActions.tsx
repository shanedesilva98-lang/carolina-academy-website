"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { organisation } from "@/content/organisation";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * Sticky bottom action bar shown on mobile only, giving one-tap access to the
 * three highest-intent actions: call, WhatsApp, apply.
 */
export function StickyMobileActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-white shadow-lift md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={organisation.telephoneHref}
        onClick={() => trackEvent("telephone_click", { source: "sticky-mobile-actions" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-navy"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Call</span>
      </a>
      <a
        href={buildWhatsAppLink(whatsappMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky-mobile-actions" })}
        className="flex flex-col items-center justify-center gap-0.5 border-x border-border bg-[#25D366]/10 py-2.5 text-[#1DA851]"
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        <span className="text-[11px] font-semibold">WhatsApp</span>
      </a>
      <Link
        href="/apply"
        className="flex flex-col items-center justify-center gap-0.5 bg-gold py-2.5 text-navy"
      >
        <FileText className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Apply</span>
      </Link>
    </div>
  );
}
