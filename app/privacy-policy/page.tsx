import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy Policy | Carolina Academy",
  description: "How Carolina Academy collects, uses and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/privacy-policy", title: "Privacy Policy", description: "Carolina Academy's privacy policy." })} />
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Privacy Policy</h1>
          <div className="mt-4"><LastUpdated date="2026-08-04" /></div>

          <DisclaimerBox variant="info" title="Legal review required" className="mt-8">
            This page is a professionally structured placeholder. It should be reviewed and finalised by a
            qualified legal professional familiar with Sri Lankan data protection law before this website is
            considered fully compliant.
          </DisclaimerBox>

          <div className="prose prose-slate mt-10 max-w-none text-ink">
            <h2 className="font-heading text-xl font-bold text-navy">1. Introduction</h2>
            <p>
              {organisation.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates {organisation.url}. This Privacy Policy explains
              how we collect, use, store and protect personal information submitted through this website,
              including via contact forms, course application forms, study-abroad eligibility forms and
              consultation booking forms.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">2. Information We Collect</h2>
            <p>We may collect information you provide directly, including:</p>
            <ul>
              <li>Full name, date of birth and identification details (for course applications)</li>
              <li>Contact details: email address, telephone number, WhatsApp number, home address</li>
              <li>Educational background and course/destination preferences</li>
              <li>Any additional information you choose to share in message fields</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-navy">3. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul>
              <li>Respond to enquiries and process course applications</li>
              <li>Provide study-abroad guidance and consultation services</li>
              <li>Send administrative communications related to your enquiry or application</li>
              <li>Improve our website and services</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-navy">4. Data Sharing</h2>
            <p>
              We do not sell personal information. Information may be shared with trusted service providers
              (such as email delivery providers) strictly to operate this website and respond to your enquiry.
              [REQUIRES CONFIRMATION: specific third-party providers once selected — see .env.example]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">5. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to respond to your enquiry or fulfil
              the purpose for which it was collected, unless a longer retention period is required by law.
              [REQUIRES CONFIRMATION: specific retention periods]
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by contacting
              us at{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">
                {organisation.email}
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">7. Cookies</h2>
            <p>
              See our{" "}
              <a href="/cookie-policy" className="text-royal hover:underline">
                Cookie Policy
              </a>{" "}
              for details on how we use cookies and similar technologies.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">8. Contact Us</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">
                {organisation.email}
              </a>{" "}
              or {organisation.telephone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
