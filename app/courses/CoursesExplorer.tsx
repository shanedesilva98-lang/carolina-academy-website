"use client";

import * as React from "react";
import { SearchAndFilter } from "@/components/shared/SearchAndFilter";
import { CourseCard } from "@/components/cards/CourseCard";
import { courseCategoryLabels } from "@/content/courses";
import type { Course } from "@/types/course";

const filters = [
  { value: "all", label: "All Courses" },
  ...Object.entries(courseCategoryLabels).map(([value, label]) => ({ value, label })),
];

export function CoursesExplorer({ courses }: { courses: Course[] }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const filtered = courses.filter((course) => {
    const matchesCategory = category === "all" || course.category === category;
    const matchesSearch =
      search.trim().length === 0 ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.overview.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <SearchAndFilter
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search courses…"
        filters={filters}
        activeFilter={category}
        onFilterChange={setCategory}
      />

      <p className="mt-6 text-sm text-ink-muted" role="status">
        Showing {filtered.length} of {courses.length} programme{courses.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface-soft p-10 text-center text-sm text-ink-muted">
          No courses match your search. Try a different keyword or category.
        </div>
      )}
    </div>
  );
}
