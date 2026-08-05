import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royal">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">{title}</Tag>
      {description ? <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p> : null}
    </div>
  );
}
