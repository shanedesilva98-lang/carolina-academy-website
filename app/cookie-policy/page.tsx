import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
import { PRIVACY_POLICY_VERSION } from "@/lib/consent-text";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Cookie Policy | Carolina Academy",
  description: "How Carolina Academy uses cookies and similar technologies on this website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/cookie-policy", title: "Cookie Policy", description: "Carolina Academy's cookie policy." })} />
      <Breadcrumbs items={[{ name: "Cookie Policy", path: "/cookie-policy" }]} />

      <section className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Cookie Policy</h1>
          <div className="mt-4"><LastUpdated date={PRIVACY_POLICY_VERSION} /></div>

          <div className="mt-10 space-y-8 leading-relaxed text-ink-muted">
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">What are cookies?</h2>
              <p className="mt-3">
                Cookies are small text files that a website can place on your device. They are used to make websites
                work, to remember choices, and sometimes to measure how a site is used or to show advertising.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-navy">What this website uses today</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-6">
                <li>
                  <strong>No analytics or advertising cookies.</strong> At the date of this policy, this website does not
                  run Google Analytics, Google Tag Manager, the Meta Pixel or the Meta Conversions API, and it does not
                  set advertising or tracking cookies.
                </li>
                <li>
                  <strong>Embedded Google Maps.</strong> Our location pages can show a Google Map. When it loads, Google may
                  set cookies and receive your IP address under{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">Google&apos;s privacy policy</a>.
                </li>
                <li>
                  <strong>Links to other services.</strong> If you follow a WhatsApp, Facebook or Instagram link, that
                  service sets its own cookies under its own policy.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-navy">If this changes</h2>
              <p className="mt-3">
                If we decide to use analytics or advertising tools in future, we will first update this policy and our{" "}
                <a href="/privacy-policy" className="text-royal hover:underline">Privacy Policy</a>, and we will ask for your consent
                before any non-essential cookies are set.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Your choices</h2>
              <p className="mt-3">
                You can block or delete cookies in your browser settings. Blocking the embedded map&apos;s cookies does not
                affect the rest of the website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
              <p className="mt-3">
                Questions about this Cookie Policy can be sent to{" "}
                <a href={organisation.emailHref} className="text-royal hover:underline">{organisation.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
