import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CourseFeeInstalment } from "@/types/course";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string (YYYY-MM-DD) as a readable date, e.g. "4 August 2026". */
export function formatDate(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Render a course's instalment plan (array or "[REQUIRES CONFIRMATION]") as plain text. */
export function formatInstalments(instalments: CourseFeeInstalment[] | "[REQUIRES CONFIRMATION]"): string {
  if (instalments === "[REQUIRES CONFIRMATION]") return instalments;
  if (instalments.length === 0) return "[REQUIRES CONFIRMATION]";
  return instalments.map((i) => `${i.label}: ${i.amount}`).join(", ");
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://carolinaacademy.lk";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
