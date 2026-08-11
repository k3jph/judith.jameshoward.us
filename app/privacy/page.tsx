import type { Metadata } from "next";
import { PageShell, SectionIntro } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy and Cookie Notice",
  description: "How The Fatal Image handles technical information, cookie consent, and optional Google Analytics.",
};

export default function PrivacyPage() {
  return <PageShell className="privacy-page">
    <SectionIntro eyebrow="Privacy, cookies & choice" title="Privacy & Cookie Notice">
      <p>This notice explains what may be collected when you visit this exhibition, why it is collected, and the choices available to you.</p>
    </SectionIntro>

    <article className="privacy-notice section-pad">
      <p className="privacy-notice__lede">This is a personal research exhibition operated by James P. Howard, II. Questions about this notice or information associated with the site may be sent through the <a href="https://jameshoward.us/contact-me" target="_blank" rel="noreferrer">contact page on my main website ↗</a>.</p>

      <section>
        <p className="eyebrow">Ordinary operation</p>
        <h2>Information collected automatically</h2>
        <p>The site and its hosting infrastructure may automatically process limited technical information when a page is requested. This can include an Internet Protocol address, request time, requested resource, referring page, browser and device information, and information needed to detect errors, abuse, or threats.</p>
        <p>This information may appear in ordinary server and security logs. It is used to deliver and protect the exhibition, diagnose technical problems, and prevent abuse. Hosting, diagnostic, and security providers control their own retention practices.</p>
      </section>

      <section id="cookies">
        <p className="eyebrow">Your choice</p>
        <h2>Cookies</h2>
        <p>The exhibition uses one necessary cookie to remember your privacy choice and, only with your consent, Google Analytics cookies.</p>
        <h3>Consent cookie</h3>
        <p>After you accept or reject analytics, the site stores a cookie named <code>cookieConsent</code>. It records the decision and the version of this notice under which it was made. It is not used to track activity and normally remains for 365 days. A material notice change can require a new choice sooner.</p>
        <h3>Cookie settings</h3>
        <p>Google Analytics will not load, contact Google, or set analytics cookies unless you select <b>Accept analytics</b>. Rejecting analytics does not limit the exhibition. A recognized Global Privacy Control signal is treated as rejection.</p>
        <p>You may review or change the choice at any time by selecting <button type="button" className="privacy-settings-link" data-cookie-preferences>Cookie settings</button>. Withdrawing consent disables future Analytics collection and attempts to remove this site&apos;s Google Analytics cookies from the browser.</p>
      </section>

      <section>
        <p className="eyebrow">Optional measurement</p>
        <h2>Google Analytics</h2>
        <p>With consent, this exhibition uses Google Analytics 4 to understand general traffic patterns, how visitors find and move through the site, and which parts of the exhibition are useful. Analytics may process pages viewed, approximate visit times and durations, general referral and geographic information, browser and device characteristics, and interactions with site features.</p>
        <div className="privacy-cookie-table" role="table" aria-label="Google Analytics cookies">
          <div role="row"><b role="columnheader">Cookie</b><b role="columnheader">Purpose</b><b role="columnheader">Typical duration</b></div>
          <div role="row"><code role="cell">_ga</code><span role="cell">Distinguishes one browser from another for statistical measurement</span><span role="cell">Up to two years</span></div>
          <div role="row"><code role="cell">_ga_*</code><span role="cell">Maintains session information for this Analytics property</span><span role="cell">Up to two years</span></div>
        </div>
        <p>The site configures advertising storage, advertising user data, advertising personalization, Google Signals, and advertising-personalization signals as denied or disabled. It does not use Analytics to display targeted advertising.</p>
        <p>Google may process Analytics information outside your country. Google is responsible for its processing and transfer safeguards. See <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google&apos;s Privacy Policy ↗</a> and its explanation of <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">how it uses information from sites using its services ↗</a>.</p>
      </section>

      <section>
        <p className="eyebrow">Beyond this exhibition</p>
        <h2>External sites and communication</h2>
        <p>The exhibition links to museums, collections, publications, social networks, and other independently operated services. Following a link allows the destination to receive information from your browser under its own terms. Those services do not receive information merely because their links appear here.</p>
        <p>If you contact me, I may receive your name, contact information, and anything else you include. That information is used to read and respond to the communication, maintain appropriate records, and take an action you request or authorize.</p>
      </section>

      <section>
        <p className="eyebrow">Control & accountability</p>
        <h2>Use, retention, and rights</h2>
        <p>I do not sell personal information or knowingly share it for cross-context behavioral advertising. Information may be processed by providers supporting hosting, security, communication, or consented measurement, or disclosed when reasonably necessary to comply with law, protect the site or others, investigate abuse, or establish and defend legal claims.</p>
        <p>Information is retained only as reasonably necessary for the purpose for which it was collected. Depending on location and applicable law, visitors may have rights to request access, correction, deletion, restriction, objection, portability, withdrawal of consent, or review by a data-protection authority. Applicable rights can be exercised through the contact method above.</p>
      </section>

      <section>
        <p className="eyebrow">Revision</p>
        <h2>Changes to this notice</h2>
        <p>The notice may change when the exhibition, its services, or applicable requirements change. If a change materially affects the basis on which Analytics consent was obtained, the site will invalidate the previous policy version and request a new choice.</p>
        <p className="privacy-notice__updated">Last updated: August 11, 2026.</p>
      </section>
    </article>
  </PageShell>;
}
