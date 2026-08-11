import Link from "next/link";
import type { ReactNode } from "react";

const nav = [["Gallery", "/gallery"], ["The Story", "/story"], ["Map", "/map"], ["Through Time", "/interpretation"], ["Read Judith", "/read"], ["Compare", "/compare"], ["About", "/about"]];

export function Header({ transparent = false }: { transparent?: boolean }) {
  return <header className={`site-header ${transparent ? "site-header--transparent" : ""}`}>
    <a className="skip-link" href="#main">Skip to exhibition</a>
    <div className="header-inner">
      <Link className="wordmark" href="/" aria-label="Judith and Holofernes — exhibition entrance">
        <span className="wordmark-mark" aria-hidden="true" /><span><b>Judith &amp; Holofernes</b><small>The Fatal Image</small></span>
      </Link>
      <nav aria-label="Primary navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
      <details className="nav-drawer"><summary aria-label="Open exhibition menu"><span /><span /></summary><div>{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></details>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-identity">
      <span className="footer-identity-badge"><a href="https://jameshoward.us"><img src="/jh-badge-1x1.svg" alt="James Howard identity badge" /></a></span>
      <div><p className="footer-domain">judith.jameshoward.us</p><p className="footer-byline">A website of <a href="https://jameshoward.us">James Howard</a></p></div>
    </div>
    <div className="footer-links">
      <Link href="/map">Made here / held here</Link><Link href="/research">Object-first research sweep</Link><Link href="/about">About &amp; methodology</Link><Link href="/sources">Bibliography &amp; sources</Link><Link href="/rights">Image rights &amp; credits</Link><Link href="/privacy">Privacy &amp; cookies</Link><button type="button" data-cookie-preferences>Cookie settings</button>
    </div>
  </footer>;
}

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <><Header /><main id="main" className={className}>{children}</main><Footer /></>;
}

export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="section-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="section-deck">{children}</div></header>;
}
