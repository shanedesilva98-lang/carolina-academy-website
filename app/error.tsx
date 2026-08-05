"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <AlertTriangle className="h-14 w-14 text-warning" aria-hidden="true" />
      <h1 className="mt-6 font-heading text-3xl font-extrabold text-navy">Something Went Wrong</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        An unexpected error occurred while loading this page. Please try again, or contact Carolina Academy
        directly if the problem continues.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button size="lg" variant="primary" onClick={() => reset()}>
          Try Again
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </section>
  );
}
