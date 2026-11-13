import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { locations, organisation } from "@/content/organisation";
import { PRIVACY_POLICY_VERSION } from "@/lib/consent-text";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy Policy | Carolina Academy",
  description:
    "How Carolina Academy (Pvt) Ltd collects, uses, shares and protects personal information from website enquiries, Facebook and Instagram Instant Forms, consultations, training applications and study-abroad admissions.",
  path: "/privacy-policy",
});

const [chilaw, katunayake] = locations;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-24">
      <h2 className="font-heading text-xl font-bold text-navy">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-muted">{children}</div>
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-6">{children}</ul>;
}

const contents = [
  ["who-we-are", "Who we are"],
  ["information-we-collect", "Information we collect"],
  ["instant-forms", "Facebook and Instagram Instant Forms"],
  ["how-we-use", "How we use your information"],
  ["how-we-contact", "How our team contacts you"],
  ["marketing", "Promotional marketing and opting out"],
  ["sharing", "Who we share information with"],
  ["international", "Processing outside Sri Lanka"],
  ["website-visitors", "Website visitors and cookies"],
  ["security", "Keeping your information safe"],
  ["retention", "How long we keep information"],
  ["rights", "Your rights and complaints"],
  ["under-18", "Applicants under 18"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaMarkup schema={webPageSchema({ path: "/privacy-policy", title: "Privacy Policy", description: "Carolina Academy's privacy policy." })} />
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />

      <article className="py-16 sm:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-navy">Privacy Policy</h1>
          <div className="mt-4"><LastUpdated date={PRIVACY_POLICY_VERSION} /></div>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            This policy explains what personal information Carolina Academy (Pvt) Ltd collects when you enquire
            about, or apply for, our vocational training programmes or study-abroad guidance, what we do with it,
            and the choices you have.
          </p>

          <nav aria-label="On this page" className="mt-8 rounded-2xl border border-border bg-surface-off p-5">
            <p className="font-heading text-sm font-bold text-navy">On this page</p>
            <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 pl-5 text-sm sm:grid-cols-2">
              {contents.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-royal hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="who-we-are" title="1. Who we are">
            <p>
              Carolina Academy (Pvt) Ltd, trading as Carolina Academy (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), is a private
              vocational training institute and study-abroad consultancy in Sri Lanka. We decide how and why the
              personal information described in this policy is used. We operate from two offices:
            </p>
            <List>
              <li><strong>{chilaw.name}</strong>, {chilaw.full}</li>
              <li><strong>{katunayake.name}</strong>, {katunayake.full}</li>
            </List>
            <p>
              Carolina Academy is a TVEC Registered Institution (Registration No. {organisation.tvec.registrationNumber}). Our
              website is {organisation.url}. This policy applies to personal information collected through that
              website, our Facebook and Instagram Instant Forms, and by telephone, WhatsApp, email and in person.
            </p>
          </Section>

          <Section id="information-we-collect" title="2. Information we collect">
            <p><strong>When you make an enquiry</strong> (website form, Instant Form, call, WhatsApp, email or visit) we may collect:</p>
            <List>
              <li>your name;</li>
              <li>your telephone number, email address and WhatsApp number, and how you prefer us to contact you;</li>
              <li>your educational qualifications, such as your highest level of education and, for study abroad, your English or Korean language level;</li>
              <li>the course, study-abroad destination, pathway and intake you are interested in;</li>
              <li>anything else you choose to tell us in a message.</li>
            </List>
            <p>
              <strong>When you apply for a vocational training programme</strong> through our website application form we also ask
              for your date of birth and home address. The website does not ask for your NIC or passport number.
            </p>
            <p>
              <strong>When you enrol or apply to study abroad</strong>, we may later ask you for documents needed for the
              enrolment or application, such as a copy of your NIC or passport, academic certificates and transcripts and, where a
              university or visa process requires it, financial documents. Our staff will tell you which documents are needed and
              how to send them. Please do not send identity or financial documents until you have been asked to.
            </p>
            <p>
              <strong>Records of our contact with you</strong>, including notes of calls and the messages we exchange.
            </p>
            <p>
              <strong>Technical information.</strong> When you submit a website form, we briefly use your internet (IP)
              address to limit spam and repeated submissions. See section 9 for cookies and website analytics.
            </p>
          </Section>

          <Section id="instant-forms" title="3. Facebook and Instagram Instant Forms">
            <p>
              When you complete an Instant Form in a Carolina Academy advertisement on Facebook or Instagram, Meta
              collects the details you enter and makes them available to us. The form normally asks for your name,
              telephone number and email address, and may ask for your WhatsApp number, your highest educational
              qualification, and the course or study destination and intake you are interested in. Meta may fill in some
              fields from your profile, and you can change them before you submit.
            </p>
            <List>
              <li>We do <strong>not</strong> ask for NIC or passport numbers, bank or other financial account details, or copies of documents through an Instant Form, and ask you not to send them there.</li>
              <li>We use the details to contact you about the programme or destination you asked about (see section 4, enquiry follow-up). Submitting an Instant Form does not by itself sign you up for promotional marketing.</li>
              <li>Meta processes your information under its own privacy policy:{" "}
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">facebook.com/privacy/policy</a>.
              </li>
            </List>
          </Section>

          <Section id="how-we-use" title="4. How we use your information">
            <p><strong>Enquiry follow-up and admissions.</strong> We use your information to:</p>
            <List>
              <li>reply to your enquiry and provide information on our courses, fees, intakes and study-abroad services;</li>
              <li>book and hold consultations;</li>
              <li>assess and process your application, enrol you and deliver training;</li>
              <li>provide study-abroad guidance, prepare university applications and visa-supporting documents, and communicate with universities for you, when you ask us to;</li>
              <li>keep records of our dealings with you, and meet legal and regulatory obligations, including those that apply to a TVEC registered institution;</li>
              <li>keep our website and systems secure and prevent spam and misuse.</li>
            </List>
            <p>
              We do this because you asked us to, to take steps you have requested before and during enrolment, to run
              our institute responsibly and, where relevant, to meet our legal duties. These uses do not depend on
              you agreeing to promotional marketing.
            </p>
            <p>
              <strong>Optional promotional marketing</strong> is separate and is described in section 6. We do not make
              marketing consent a condition of answering your enquiry or processing your application.
            </p>
          </Section>

          <Section id="how-we-contact" title="5. How our team contacts you">
            <p>
              Details you submit through our website forms are sent by email, over an encrypted connection, to our
              admissions mailbox. Enquiries from the website, Instant Forms and other channels are handled by our admissions and
              study-abroad staff. They contact you using the telephone number, email address or WhatsApp number you gave
              us, and by the method you prefer where you told us one. We aim to reply within one to two working days.
              Our offices are open {organisation.openingHours.days}, {organisation.openingHours.hours}.
            </p>
            <p>
              Our staff record your enquiry, the course or destination you are interested in, and notes of our
              conversations, so that you do not need to repeat yourself and so that each enquiry can be followed up.
              Only staff who need the information to deal with your enquiry or application should have access to it.
            </p>
            <p>
              WhatsApp is operated by Meta. Messages and files sent over WhatsApp are handled by WhatsApp under its own
              terms and privacy policy.
            </p>
          </Section>

          <Section id="marketing" title="6. Promotional marketing and opting out">
            <p>
              Messages about your own enquiry or application, such as replies, appointment details and reminders, are
              part of enquiry follow-up and are not promotional marketing.
            </p>
            <p>
              We send <strong>promotional marketing</strong>, such as news of new courses, intakes, events and offers, only to people who have
              told us they would like to receive it. Our website forms include an optional, unticked box for this, and you can also tell our staff. When you tick it,
              we keep a separate record of the date, the wording you agreed to and your contact details.
              Saying no does not affect your enquiry or application.
            </p>
            <p>
              You can opt out of promotional messages at any time by replying &quot;STOP&quot; or asking us in any message, by using any unsubscribe link, or by
              contacting us at{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">{organisation.email}</a>. We will
              stop promotional messages promptly. We may still contact you about an application or enrolment already in progress.
            </p>
          </Section>

          <Section id="sharing" title="7. Who we share information with">
            <p>We do not sell personal information. We share it only as follows.</p>
            <List>
              <li><strong>Service providers</strong> that help us run our website and communications: Vercel (website hosting), Zoho (email), and Meta (Facebook, Instagram and WhatsApp) where you use those services to contact us. They may use your information only to provide their services.</li>
              <li><strong>Google</strong>, if you load an embedded Google Map on our location pages.</li>
              <li><strong>Universities, colleges and visa or embassy authorities</strong>, only when you have asked us to apply or prepare documents on your behalf, and only the information needed for that purpose.</li>
              <li><strong>Regulators, courts and professional advisers</strong>, where the law requires or to protect our legal rights.</li>
            </List>
          </Section>

          <Section id="international" title="8. Processing outside Sri Lanka">
            <p>
              Our website hosting, email and messaging providers (Vercel, Zoho and Meta) operate internationally, so
              your information may be stored or processed on servers outside Sri Lanka. If you ask us to help you apply to a
              university abroad, your application information is sent to that university and to authorities in the
              destination country, for example South Korea. We do not transfer your information abroad for any other purpose.
            </p>
          </Section>

          <Section id="website-visitors" title="9. Website visitors and cookies">
            <p>
              At the date of this policy, our website does not run advertising pixels (including the Meta Pixel or Meta
              Conversions API) or website analytics tools. If we decide to use them, we will update this policy and our{" "}
              <a href="/cookie-policy" className="text-royal hover:underline">Cookie Policy</a> first, and will ask for your consent
              where required.
            </p>
            <p>
              Our hosting provider records technical information, such as IP address and pages requested, in order to deliver the website
              and keep it secure. Our location pages can display an embedded Google Map, which may set cookies from Google.
              You can block or delete cookies in your browser settings.
            </p>
            <p>
              Our website and messages link to other sites, such as Meta, Google and university websites. We are not
              responsible for their privacy practices, so please read their policies.
            </p>
          </Section>

          <Section id="security" title="10. Keeping your information safe">
            <p>
              We take reasonable steps to protect personal information. Our website uses encrypted (HTTPS) connections,
              our forms check and limit what is submitted, and we use spam and rate-limit controls. We restrict access to the staff who deal with your
              enquiry or application. No online system is completely secure, so please avoid sending sensitive documents unless
              we have asked for them and told you how to send them. If you think your information has been compromised, please
              contact us at once.
            </p>
          </Section>

          <Section id="retention" title="11. How long we keep information">
            <p>
              We keep personal information only as long as we need it for the purposes in this policy, including
              following up your enquiry, handling your application, delivering and certifying training, keeping
              business and legal records, and dealing with any later questions or disputes. Enquiries that do not go
              ahead are not kept indefinitely. When information is no longer needed we delete it or remove anything that identifies you.
              If you would like us to delete your information sooner, see section 12.
            </p>
          </Section>

          <Section id="rights" title="12. Your rights and complaints">
            <p>Subject to applicable Sri Lankan law, you may ask us to:</p>
            <List>
              <li>tell you whether we hold personal information about you and give you a copy;</li>
              <li>correct information that is wrong or incomplete;</li>
              <li>delete your information, or restrict how we use it;</li>
              <li>stop using your information for promotional marketing, or withdraw any consent you gave, at any time.</li>
            </List>
            <p>
              Contact us using the details in section 15. We may need to confirm who you are first. Withdrawing consent does not affect
              what we did before you withdrew it, and we may need to keep some records where the law requires.
            </p>
            <p>
              If you have a concern about how we have handled your information, please contact us first so we can put
              it right. You may also complain to the Data Protection Authority of Sri Lanka or another competent authority.
              Our handling of personal information is guided by Sri Lanka&apos;s Personal Data Protection Act, No. 9 of 2022.
            </p>
          </Section>

          <Section id="under-18" title="13. Applicants under 18">
            <p>
              If you are under 18, please ask a parent or guardian to help you with your enquiry or application. We may
              ask for their involvement before we enrol you or use your information for anything beyond answering your
              enquiry.
            </p>
          </Section>

          <Section id="changes" title="14. Changes to this policy">
            <p>
              We may update this policy, for example if we introduce new systems, such as a customer relationship
              management system or a learning management system, or new analytics or advertising tools. The date at the top
              shows when it was last changed. We will not treat a new tool as in use until this policy describes it.
            </p>
          </Section>

          <Section id="contact" title="15. Contact us">
            <p>
              For any privacy question or request, contact Carolina Academy at{" "}
              <a href={organisation.emailHref} className="text-royal hover:underline">{organisation.email}</a> or:
            </p>
            <List>
              <li>
                <strong>{chilaw.name}:</strong> {chilaw.full}. Tel:{" "}
                <a href={chilaw.telephoneHref} className="text-royal hover:underline">{chilaw.telephone}</a>
              </li>
              <li>
                <strong>{katunayake.name}:</strong> {katunayake.full}. Tel:{" "}
                {katunayake.phones.map((phone, index) => (
                  <span key={phone.number}>
                    {index > 0 ? " / " : null}
                    <a href={phone.href} className="text-royal hover:underline">{phone.number}</a>
                  </span>
                ))}
              </li>
            </List>
          </Section>
        </div>
      </article>
    </>
  );
}
