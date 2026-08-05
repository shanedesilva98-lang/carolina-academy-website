"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export function SearchAndFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search courses…",
  filters,
  activeFilter,
  onFilterChange,
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <Input
          type="search"
          role="searchbox"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search"
          className="pl-10"
        />
      </div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal",
              activeFilter === filter.value
                ? "border-navy bg-navy text-white"
                : "border-border bg-white text-navy hover:bg-surface-soft"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
