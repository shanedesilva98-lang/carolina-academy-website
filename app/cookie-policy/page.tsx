import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { organisation } from "@/content/organisation";
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
          <div className="mt-4"><LastUpdated date="2026-08-04" /></div>

          <DisclaimerBox variant="info" title="Legal review required" className="mt-8">
            This page is a professionally structured placeholder and should be reviewed once analytics and
            advertising tools (see .env.example) are activated in production.
          </DisclaimerBox>

          <div className="prose prose-slate mt-10 max-w-none text-ink">
            <h2 className="font-heading text-xl font-bold text-navy">What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to help websites function and to collect
              analytics information.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Cookies We May Use</h2>
            <ul>
              <li><strong>Essential cookies</strong> — required for basic website functionality.</li>
              <li><strong>Analytics cookies</strong> — Google Analytics 4, used to understand website usage (only active once NEXT_PUBLIC_GA_ID is configured).</li>
              <li><strong>Advertising cookies</strong> — Meta Pixel, used to measure marketing effectiveness (only active once NEXT_PUBLIC_META_PIXEL_ID is configured).</li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-navy">Your Choices</h2>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect the
              functionality of some parts of this website. A cookie-consent banner will be added prior to
              activating non-essential analytics or advertising cookies in production.
            </p>

            <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
            <p>
              Questions about this Cookie Policy can be sent to{" "}
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
