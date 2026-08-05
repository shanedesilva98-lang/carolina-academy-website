/**
 * News article & Event data models. CMS-ready — see CMS_MIGRATION.md.
 */

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: { src: string; alt: string };
  author: string;
  reviewer?: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  body: string[]; // paragraphs / markdown-lite blocks
  sources: ArticleSource[];
  seo: SeoMeta;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: { src: string; alt: string };
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  body: string[];
  eventDate: string;
  eventEndDate?: string;
  location: string;
  registrationUrl?: string;
  seo: SeoMeta;
}
