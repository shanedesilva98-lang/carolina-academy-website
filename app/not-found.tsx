import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <SearchX className="h-14 w-14 text-royal" aria-hidden="true" />
      <h1 className="mt-6 font-heading text-4xl font-extrabold text-navy">Page Not Found</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try one of the links below, or head back to
        the homepage.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" variant="primary">
          <Link href="/">Back to Homepage</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/courses">Browse Courses</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}
