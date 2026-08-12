import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SectionIntro } from "../components/site-chrome";
import { discoverySources, researchGaps, researchLeads, researchMetrics, researchPrinciples } from "../data/research";

export const metadata: Metadata = {
  title: "Object-First Research Sweep",
  description: "The cross-collection discovery method, open research leads, and acknowledged gaps behind the expanded exhibition.",
};

export default function ResearchPage() {
  return <PageShell className="research-page">
    <SectionIntro eyebrow="The sweep behind the gallery" title="Object-First Research">
      <p>Institutional fame is not evidence of an object’s importance. This audit begins with the subject tradition, searches across collections, and asks what each object changes.</p>
    </SectionIntro>

    <section className="research-metrics" aria-label="Research sweep metrics">{researchMetrics.map(metric => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</section>
    <p className="research-metric-note">The outside-Europe figure follows the Made map: it includes documented and explicitly ringed regional placements. Cindy Sherman’s <i>Untitled #228</i> is excluded because MoMA identifies Rome only for the series, not the individual object.</p>

    <section className="research-principles section-pad"><header className="section-heading"><div><p className="eyebrow">Selection method</p><h2>Discovery is broader<br />than display</h2></div><p>Aggregator counts are not object counts. Duplicate records, reproductions, library texts, and documentary photographs are retained during discovery and resolved during verification.</p></header><div className="research-principle-grid">{researchPrinciples.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="research-ledger section-pad"><header className="section-heading"><div><p className="eyebrow">Open ledger</p><h2>What the wider sweep<br />made visible</h2></div><p>Rights restrictions no longer keep a verified work out of the gallery: sixteen objects now have designed text-only records with the best available external link. The ledger is reserved for leads whose identity or object data still need resolution; works promoted to the gallery leave it.</p></header><div>{researchLeads.map(([collection, object, note, url]) => <article key={`${collection}-${object}`}><p>{collection}</p><h3><a href={url} target="_blank" rel="noreferrer">{object} ↗</a></h3><span>{note}</span></article>)}</div></section>

    <section className="research-gaps section-pad"><header className="section-heading"><div><p className="eyebrow">The unfinished exhibition</p><h2>What the current sweep<br />still misses</h2></div><p>Sixty-four objects are a working corpus, not a completeness claim. These are active research gaps—not categories presumed unimportant because they are difficult to catalogue.</p></header><ol>{researchGaps.map(([title, note], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{note}</p></div></li>)}</ol></section>

    <section className="research-sources section-pad"><div><p className="eyebrow">Discovery layer</p><h2>Cross-collection indexes</h2><p>These indexes are used to find candidates, never as a substitute for the object record. Their blind spots are part of the method.</p></div><ul>{discoverySources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}<span>↗</span></a></li>)}</ul></section>

    <section className="research-next"><p>See the result as geography.</p><Link className="button button--primary" href="/map">Open the two maps →</Link></section>
  </PageShell>;
}
