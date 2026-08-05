/**
 * Reusable helper for generating contextual, pre-filled WhatsApp links.
 * Number is sourced from NEXT_PUBLIC_WHATSAPP_NUMBER (public — safe to expose).
 */

const DEFAULT_NUMBER = "94773952316";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER;
}

export function buildWhatsAppLink(message: string, number: string = getWhatsAppNumber()): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export const whatsappMessages = {
  general: "Hello Carolina Academy, I would like more information.",
  pastryBakery: "Hello Carolina Academy, I am interested in the Pastry and Bakery NVQ course.",
  southKorea: "Hello Carolina Academy, I would like a consultation about studying in South Korea.",
  courses: "Hello Carolina Academy, I would like more information about your vocational courses.",
  studyAbroad: "Hello Carolina Academy, I would like a study-abroad consultation.",
  apply: "Hello Carolina Academy, I would like to start an application.",
};
