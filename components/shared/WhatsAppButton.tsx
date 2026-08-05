"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
  variant?: "floating" | "inline" | "icon";
  source?: string;
}

export function WhatsAppButton({
  message = whatsappMessages.general,
  className,
  label = "Chat on WhatsApp",
  variant = "inline",
  source = "unknown",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  const handleClick = () => trackEvent("whatsapp_click", { source, message });

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={label}
        className={cn(
          "fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 motion-reduce:transition-none md:bottom-6",
          className
        )}
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
      </a>
    );
  }

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1DA851]",
          className
        )}
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#1DA851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      {label}
    </a>
  );
}
