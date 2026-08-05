import Link from "next/link";
import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PathwayCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: { src: string; alt: string };
  icon: LucideIcon;
  variant?: "navy" | "royal";
}

export function PathwayCard({ title, description, href, ctaLabel, image, icon: Icon, variant = "navy" }: PathwayCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className={cn("absolute inset-0", variant === "navy" ? "bg-navy/40" : "bg-royal/40")} />
        <span
          className={cn(
            "absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-white",
            variant === "navy" ? "bg-navy" : "bg-royal"
          )}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-heading text-2xl font-extrabold text-navy">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        <span className="mt-auto inline-flex items-center gap-2 font-heading text-sm font-bold text-royal">
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
