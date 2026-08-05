import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Carolina Academy",
  description: "Terms and conditions for using the Carolina Academy website and enrolling in Carolina Academy programmes.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/terms-and-conditions", title: "Terms and Conditions", description: "Carolina Academy's terms and conditions." })} />
      <Breadcrumbs items={[{ name: "Terms and Conditions", path: "/terms-and-conditions" }]} />

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Terms and Conditions</h1>
          <div className="mt-4"><LastUpdated date="2026-08-04" /></div>

          <DisclaimerBox variant="info" title="Legal review required" className="mt-8">
            This page is a professionally structured placeholder and should be reviewed and finalised by a
            qualified legal professional before being relied upon as a binding agreement.
          </DisclaimerBox>

          <div className="prose prose-slate mt-10 max-w-none text-ink">
            <h2 className="font-heading text-xl font-bold text-navy">1. Acceptance of Terms</h2>
            <p>
              By using {organisation.url} (&quot;the Website&quot;) or enrolling in a programme with {organisation.name},
              you agree to these Terms and Conditions.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">2. Course Enrolment</h2>
            <p>
              Enrolment in any Carolina Academy programme is subject to meeting the published entry
              requirements, availability of places, and completion of the application and payment process.
              Carolina Academy reserves the right to decline an application at its discretion.
              [REQUIRES CONFIRMATION: full enrolment terms]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">3. Study-Abroad Guidance Services</h2>
            <p>
              Carolina Academy provides application and documentation support for study-abroad services. This
              support does not constitute a guarantee of university admission, visa approval or any other
              outcome. See our{" "}
              <a href="/disclaimer" className="text-royal hover:underline">
                Disclaimer
              </a>{" "}
              page for full detail.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">4. Fees and Payment</h2>
            <p>
              Course fees and payment terms are set out on individual course pages and are subject to change.
              See our{" "}
              <a href="/refund-policy" className="text-royal hover:underline">
                Refund Policy
              </a>{" "}
              for details on refunds.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">5. Intellectual Property</h2>
            <p>
              All content on this Website, including text, images and branding, is the property of Carolina
              Academy or its licensors and may not be reproduced without permission.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">6. Limitation of Liability</h2>
            <p>
              Carolina Academy makes reasonable efforts to keep information on this Website accurate and current
              but does not guarantee completeness or accuracy at all times. [REQUIRES CONFIRMATION: full
              limitation of liability clause, to be drafted by qualified legal counsel]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">7. Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws of Sri Lanka.</p>

            <h2 className="font-heading text-xl font-bold text-navy">8. Contact Us</h2>
            <p>
              Questions about these Terms can be sent to{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">
                {organisation.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
