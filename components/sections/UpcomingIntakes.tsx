import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { Button } from "@/components/ui/button";
import { courses } from "@/content/courses";

export function UpcomingIntakes() {
  return (
    <section className="bg-surface-off py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Intakes"
          title="Programme Status & Intakes"
          description="Intake dates are confirmed on each course page. Programmes are always labelled honestly as active, upcoming or under development."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-soft text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="px-5 py-3.5">Programme</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
                <th scope="col" className="px-5 py-3.5">Next Intake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-surface-soft/60">
                  <td className="px-5 py-4 font-medium text-navy">
                    <Link href={`/courses/${course.slug}`} className="hover:text-royal hover:underline">
                      {course.shortTitle}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <VerificationBadge
                      kind={course.status === "active" ? "active" : course.status === "upcoming" ? "upcoming" : "requires-confirmation"}
                    />
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{course.nextIntake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button asChild size="lg" variant="primary" className="mt-8">
          <Link href="/courses">View All Courses</Link>
        </Button>
      </div>
    </section>
  );
}
