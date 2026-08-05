import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Refund Policy | Carolina Academy",
  description: "Carolina Academy's refund policy for course fees and study-abroad service fees.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/refund-policy", title: "Refund Policy", description: "Carolina Academy's refund policy." })} />
      <Breadcrumbs items={[{ name: "Refund Policy", path: "/refund-policy" }]} />

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Refund Policy</h1>
          <div className="mt-4"><LastUpdated date="2026-08-04" /></div>

          <DisclaimerBox variant="info" title="Legal and finance review required" className="mt-8">
            This page is a professionally structured placeholder. Specific refund percentages, timeframes and
            conditions require confirmation from Carolina Academy&apos;s management and review by qualified legal
            counsel before publication.
          </DisclaimerBox>

          <div className="prose prose-slate mt-10 max-w-none text-ink">
            <h2 className="font-heading text-xl font-bold text-navy">1. General Principle</h2>
            <p>
              Carolina Academy aims to handle refund requests fairly and transparently. Specific refund
              conditions may vary by programme and are confirmed at the time of enrolment.
              [REQUIRES CONFIRMATION: exact refund percentages and timeframes]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">2. Course Fee Refunds</h2>
            <p>
              [REQUIRES CONFIRMATION: conditions under which course fees are refundable, partially refundable,
              or non-refundable, including any applicable notice periods before a course start date]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">3. Study-Abroad Service Fees</h2>
            <p>
              [REQUIRES CONFIRMATION: refund conditions for study-abroad guidance and application support
              services, noting that third-party fees such as university application fees are typically
              non-refundable regardless of Carolina Academy&apos;s own policy]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">4. How to Request a Refund</h2>
            <p>
              To request a refund, contact Carolina Academy at{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">
                {organisation.email}
              </a>{" "}
              or {organisation.telephone}, providing your name, programme and reason for the request.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">5. Processing Time</h2>
            <p>[REQUIRES CONFIRMATION: typical processing time for approved refunds]</p>
          </div>
        </div>
      </section>
    </>
  );
}
