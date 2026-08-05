import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { breadcrumbListSchema } from "@/lib/schema";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-surface-off">
      <SchemaMarkup schema={breadcrumbListSchema(full)} />
      <ol className="container flex flex-wrap items-center gap-1.5 py-3 text-xs text-ink-muted">
        {full.map((item, index) => {
          const isLast = index === full.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index === 0 ? <Home className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-navy">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-royal">
                  {item.name}
                </Link>
              )}
              {!isLast ? <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
