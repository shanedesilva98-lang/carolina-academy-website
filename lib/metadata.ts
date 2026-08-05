import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME = "Carolina Academy";
const DEFAULT_OG_IMAGE = "/images/og-default.svg";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
}

/**
 * Build a consistent Metadata object (title, description, canonical, Open
 * Graph, Twitter card, robots) for a page. Use on every route via
 * `export const metadata = buildMetadata({...})` or
 * `export async function generateMetadata()` for dynamic routes.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: absoluteUrl(image) }],
      locale: "en_LK",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
