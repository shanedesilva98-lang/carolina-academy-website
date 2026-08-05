import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/components/layout/nav-data";

interface MegaMenuProps {
  label: string;
  items: NavLink[];
}

export function MegaMenu({ label, items }: MegaMenuProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:w-[640px]">
          {items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-0.5 rounded-xl p-3 transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
                >
                  <span className="flex items-center gap-1.5 font-heading text-sm font-bold text-navy group-hover:text-royal">
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  {item.description ? (
                    <span className="text-xs text-ink-muted">{item.description}</span>
                  ) : null}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
