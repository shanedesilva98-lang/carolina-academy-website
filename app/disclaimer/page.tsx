import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Disclaimer | Carolina Academy",
  description: "Important disclaimers regarding Carolina Academy's vocational training and study-abroad guidance services.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/disclaimer", title: "Disclaimer", description: "Carolina Academy's disclaimer." })} />
      <Breadcrumbs items={[{ name: "Disclaimer", path: "/disclaimer" }]} />

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Disclaimer</h1>
          <div className="mt-4"><LastUpdated date="2026-08-04" /></div>

          <div className="prose prose-slate mt-10 max-w-none text-ink">
            <h2 className="font-heading text-xl font-bold text-navy">General Information</h2>
            <p>
              The information on this website is provided by {organisation.name} for general informational
              purposes. While we aim to keep information accurate and current, we make no representations or
              warranties of any kind, express or implied, about the completeness, accuracy, reliability or
              availability of the information, products, services or related graphics on this website.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Vocational Training</h2>
            <p>
              Course descriptions, curriculum outlines, durations, fees and intake dates are indicative and
              subject to confirmation and change. Carolina Academy does not guarantee employment outcomes for
              graduates of any programme. Employment depends on individual performance, employer requirements
              and prevailing market conditions.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Study Abroad Disclaimer</h2>
            <DisclaimerBox title="Please read carefully" className="not-prose my-6">
              <ul className="list-disc space-y-2 pl-5">
                <li>Carolina Academy provides application and documentation support only.</li>
                <li>Admission decisions are made solely by the relevant educational institution.</li>
                <li>Visa decisions are made solely by the relevant government authority.</li>
                <li>Employment eligibility while studying abroad is controlled by applicable laws and visa conditions.</li>
                <li>Requirements, fees and processes may change at any time without notice.</li>
                <li>Students must review current official information from the relevant university, embassy or immigration authority before making decisions.</li>
              </ul>
            </DisclaimerBox>
            <p>
              Carolina Academy does not guarantee university admission, visa approval, permanent residence,
              part-time work opportunities or employment of any kind in connection with study-abroad services.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Accreditation</h2>
            <p>
              Carolina Academy is a TVEC Registered Institution (Registration No. P13/0095). Individual
              programme accreditation status is displayed on each course page and is subject to verification —
              see our{" "}
              <a href="/about" className="text-royal hover:underline">
                About
              </a>{" "}
              page for the Accreditation section.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">External Links</h2>
            <p>
              This website may contain links to external websites not provided or maintained by Carolina
              Academy. We do not guarantee the accuracy or completeness of any information on these external
              websites.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
            <p>
              Questions about this Disclaimer can be sent to{" "}
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
