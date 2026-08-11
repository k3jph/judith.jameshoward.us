"use client";

import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    cookieStart?: (
      gaId: string,
      cookieName: string,
      durationDays: number,
      policyVersion: string,
    ) => void;
  }
}

const ANALYTICS_ID = "G-TBZHGJKPHW";
const COOKIE_NAME = "cookieConsent";
const CONSENT_DURATION_DAYS = 365;
const POLICY_VERSION = "1";

export function CookieConsent() {
  return <>
    <section
      className="gdpr-cookie"
      id="gdpr-cookie"
      role="region"
      aria-labelledby="gdpr-cookie-title"
      aria-describedby="gdpr-cookie-description"
      aria-hidden="true"
      hidden
    >
      <div className="gdpr-cookie__panel">
        <div className="gdpr-cookie__copy">
          <h2 className="gdpr-cookie__title" id="gdpr-cookie-title">Analytics cookies</h2>
          <p className="gdpr-cookie__description" id="gdpr-cookie-description">
            I use optional Google Analytics cookies to understand how visitors use this exhibition.
            Google Analytics will not load unless you accept. Rejecting analytics will not affect your use of the site.
          </p>
          <p className="gdpr-cookie__more">
            You can change your choice at any time in Cookie settings. <Link href="/privacy">Read my privacy and cookie notice</Link>.
          </p>
        </div>
        <div className="gdpr-cookie__actions" role="group" aria-label="Analytics cookie choices">
          <button className="gdpr-cookie__button gdpr-cookie__button--reject" type="button" data-cookie-reject>
            Reject analytics
          </button>
          <button className="gdpr-cookie__button gdpr-cookie__button--accept" type="button" data-cookie-accept>
            Accept analytics
          </button>
        </div>
      </div>
    </section>
    <Script
      id="gdpr-cookie-script"
      src="/gdpr-cookie.js"
      strategy="afterInteractive"
      onLoad={() => window.cookieStart?.(
        ANALYTICS_ID,
        COOKIE_NAME,
        CONSENT_DURATION_DAYS,
        POLICY_VERSION,
      )}
    />
  </>;
}
