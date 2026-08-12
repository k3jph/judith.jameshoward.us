import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SectionIntro } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "About the Exhibition",
  description: "Why James P. Howard, II built The Fatal Image, and how the exhibition researches, interprets, and credits its objects.",
};

const methods = [
  ["Scope", "The sixty-four-work gallery spans manuscript, tapestry, fresco, sculpture, decorative and ceremonial art, painting, drawing, print, photography, caricature, and abstraction. Works earn a place through what they change in the object tradition, never through institutional fame alone."],
  ["Dates", "A date displayed with “c.” is approximate. Ranges and disputed dating are retained. The chronological interface sorts by an internal start date solely for navigation; it does not imply false precision."],
  ["Attribution", "Institutional language governs. “Follower,” “circle of,” “after,” and possible authors are not silently promoted. A disputed attribution is part of the object's history and often part of what the work can teach."],
  ["Discovery", "Cross-collection indexes, national catalogues, regional museums, churches, libraries, artist records, private collections, and specialist collections form the discovery layer. Aggregator records are leads that must be checked, not votes for importance."],
  ["Interpretation", "Museum and scholarly readings are reported as readings. Curatorial synthesis connects objects but does not manufacture consensus. Speculation is labeled or omitted."],
  ["Images", "Every displayed file has recorded rights metadata. Public-domain or open-access images are preferred. A verified work without reusable media receives a designed text-only catalogue record, its best available link, and an explicit invitation to the holder or rightsholder."],
  ["Text", "The World English Bible British Edition with Deuterocanon and the Douay-Rheims / Challoner texts are public domain. They represent different recensions and retain different chapter and verse structures; the parallel reader includes a crosswalk instead of pretending that their versification aligns."],
  ["Accessibility", "Semantic structure, keyboard navigation, visible focus, reduced-motion support, descriptive alt text, responsive reading, and contrast are treated as curatorial infrastructure—not an optional layer."],
] as const;

const revisions = [
  {
    label: "Revision 04",
    date: "12 August 2026",
    title: "Medieval typology and print networks",
    text: "Expanded the gallery from 58 to 64 works with a Paris Bible leaf, a Fitzwilliam Speculum pairing, and engravings by Barthel Beham, Coornhert after Heemskerck, Goltzius after Spranger, and Galle after Rubens. Corrected the Botticelli support and Mantegna accession, repaired bibliography details, exposed object-level reuse links, and connected cited scholarship to the works it interprets.",
  },
  {
    label: "Revision 03",
    date: "9 August 2026",
    title: "Sources, sequence, and textual alignment",
    text: "Rechecked institutional links and object metadata, removed repeated evidence links, corrected the Cleveland manuscript date and Ca’ Pesaro dimensions, clarified disputed Giorgione measurements, repaired the story sequence, and added an Achior crosswalk for the Greek and Vulgate recensions.",
  },
  {
    label: "Revision 02",
    date: "9 August 2026",
    title: "Global expansion and research accountability",
    text: "Expanded the gallery beyond the familiar Italian canon, added text-only records for works whose images are not reusable, introduced zoomable creation and holdings maps, and made the open research agenda, rights audit, and object-first method visible.",
  },
  {
    label: "Public edition",
    date: "9 August 2026",
    title: "The room opens",
    text: "Published the first public edition with the Walters Bigot as its personal point of origin, a chronological gallery, close object readings, comparison tools, scripture reader, tours, and recoverable source links.",
  },
] as const;

export default function AboutPage() {
  return <PageShell className="about-page">
    <SectionIntro eyebrow="A personal curatorial statement" title="Why This Exhibition">
      <p>I first encountered Judith and Holofernes at the Walters Art Museum in Baltimore. I did not know then that I was looking at one image in a conversation that had already been going on for centuries.</p>
    </SectionIntro>

    <section className="about-origin section-pad">
      <div>
        <p className="eyebrow">The first encounter</p>
        <h2>Once you begin looking, Judith seems to be everywhere.</h2>
      </div>
      <div className="about-prose">
        <p>It began for me with Trophime Bigot&apos;s extraordinary candlelit painting at the Walters. Painters, sculptors, printmakers, manuscript illuminators, textile artists, and makers of ordinary and extraordinary objects have returned to the same short, brutal story: a city is threatened, its leaders have nearly exhausted their courage, and a widow decides that she will act.</p>
        <p>Judith crosses into the enemy camp, enters the world of Holofernes on terms he believes he understands, kills him, and returns to her people with his head. What fascinated me was never simply the violence. It was the extraordinary instability of the story&apos;s meaning.</p>
      </div>
    </section>

    <section className="about-meanings">
      <p className="eyebrow">One story, unstable meanings</p>
      <p>Judith can be <i>pious widow</i>, <i>civic heroine</i>, <i>tyrant-slayer</i>, <i>embodiment of chastity</i>, <i>seductress</i>, <i>political allegory</i>, <i>dangerous woman</i>, <i>national symbol</i>, <i>femme fatale</i>, <i>feminist icon</i>, or <i>nightmare</i>.</p>
      <div><p>Sometimes the artist shows the killing. Sometimes the sword has already fallen and Judith appears almost serene. Sometimes her maid is nearly invisible; sometimes the women operate as a team.</p><p>Sometimes Holofernes dominates the canvas even while dying. Sometimes he has become little more than the object Judith carries away. The story remains recognizably the same, while almost everything it is made to mean can change.</p></div>
    </section>

    <section className="about-virtual section-pad">
      <div><p className="eyebrow">A museum without walls</p><h2>That is why I had always wanted to see these works together.</h2></div>
      <div className="about-prose">
        <p>A physical exhibition capable of doing that would be nearly impossible. The objects are scattered among national museums, municipal collections, churches, university museums, libraries, private and specialist collections, and institutions across continents. Some can travel; many cannot. Some are famous. Others have been almost erased from the familiar account because their holders are less famous, their catalogues are harder to search, their objects are not reproduced constantly, or their metadata does not rise to the top of an English-language web search.</p>
        <p>A virtual exhibition has different rules. It can put Rome beside Baltimore, Florence beside Tehran, a celebrated oil painting beside a drawing, tapestry, manuscript leaf, terracotta sculpture, or Hanukkah lamp. It can show where an object was made and where it lives now, connect an image to the passage that inspired it, and place two works made centuries apart immediately beside one another.</p>
        <p>Unlike a physical exhibition, it does not have to pretend that the research is finished. That matters to me.</p>
      </div>
    </section>

    <section className="about-history section-pad">
      <p className="eyebrow">Why object-first research</p>
      <h2>Absence from the familiar story is not the same thing as absence from history.</h2>
      <div className="about-prose"><p>My own work with history and genealogy has repeatedly taught me that a life summarized as birth, marriage, and death often becomes astonishing once somebody bothers to look for what happened between those dates. The same problem exists here. An account of Judith built from the dozen paintings everybody already knows tells us something about the canon, but it does not necessarily tell us the history of the subject.</p><p>That is why this exhibition preserves its research process as part of the exhibition itself: what was searched, what was found, what could be verified, what cannot yet be shown because of image rights, and what remains unresolved. The aim is not to manufacture an impossible claim of completeness. It is to keep asking what the conventional survey has failed to notice.</p></div>
    </section>

    <section className="about-echo section-pad">
      <div><p className="eyebrow">The echo</p><h2>A woman stands up for her people when the ordinary structures meant to protect them have failed.</h2></div>
      <div className="about-prose">
        <p>That theme echoes through history and legend in radically different forms. Joan of Arc is not Judith. Lady Godiva is not Judith. Mary Rowlandson is not Judith. Mary Jane Coppock is not Judith. Their histories, circumstances, cultures, and forms of agency are their own, and resemblance is not evidence of descent or influence.</p>
        <blockquote>An echo does not mean it is the same voice.</blockquote>
        <p>But the echo matters. Human cultures repeatedly tell stories in which communal crisis becomes concentrated in the actions, suffering, courage, survival, or transgression of a woman who crosses a boundary she was not expected to cross. Sometimes she fights. Sometimes she negotiates. Sometimes she endures. Sometimes she becomes a martyr. Sometimes she survives and returns carrying knowledge that matters to everyone around her.</p>
      </div>
    </section>

    <section className="about-faith section-pad">
      <div><p className="eyebrow">Why Judith persists</p><h2>Perhaps that recurrence helps explain why Judith never disappears.</h2></div>
      <div className="about-prose"><p>The Book of Judith belongs to a particular textual and religious history, and this exhibition takes that history seriously. But artists have repeatedly discovered in Judith something capable of speaking beyond one moment: power and vulnerability, sex and violence, faith and politics, courage and fear, the individual and the community, and the unsettling possibility that when established power fails, the person everyone has underestimated may be the one who acts.</p></div>
    </section>

    <section className="about-room">
      <p>I wanted to see what happened if we put as many of those Judiths as we responsibly could into the same room.</p>
      <strong>This is that room.</strong>
      <span>— James P. Howard, II</span>
    </section>

    <section className="about-virtual section-pad" id="curator">
      <div><p className="eyebrow">About the curator</p><h2>A personal research exhibition, openly accountable.</h2></div>
      <div className="about-prose"><p>I am James P. Howard, II, a mathematician, statistician, teacher, and independent researcher with longstanding interests in history and genealogy. This is a personally curated project—not an institutional museum exhibition or a claim to formal art-historical authority.</p><p>Its value should rest on the objects, sources, and arguments it makes available for scrutiny. If you find an error, a stronger source, or a Judith the sweep has missed, <a href="https://jameshoward.us/contact-me" target="_blank" rel="noreferrer">send a correction through my main website ↗</a>.</p></div>
    </section>

    <section className="about-method section-pad">
      <header><p className="eyebrow">How the room was built</p><h2>Method, limits &amp; responsibility</h2><p>This exhibition has not undertaken direct material examination; it works from published images and records. That limitation shapes what it can claim. Links to holding institutions and rightsholders are exits by design, not footnotes reluctantly appended.</p></header>
      <div className="method-grid">{methods.map(([title, text], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="about-colophon section-pad">
      <div><p className="eyebrow">Colophon &amp; disclosure</p><h2>A human-curated, AI-assisted exhibition</h2></div>
      <div className="about-prose"><p>Research, writing, data organization, interface design, and site production were developed with AI assistance under the direction of James P. Howard, II. AI accelerated cross-collection searching, comparison, drafting, coding, and error checking; it did not make the curatorial decisions.</p><p>James selected the objects, set the research principles, directed the interpretation and design, reviewed revisions, and remains responsible for the exhibition&apos;s errors. The site is a living edition: corrections and stronger evidence will be incorporated rather than concealed. <a href="https://jameshoward.us/contact-me" target="_blank" rel="noreferrer">Submit a correction ↗</a></p><p><Link href="#changelog">Read the revision history ↓</Link></p></div>
    </section>

    <section className="about-changelog section-pad" id="changelog">
      <header><p className="eyebrow">Living edition</p><h2>Revision history</h2><p>Substantive corrections and expansions remain visible here. The record is intentionally concise, but it will grow as this exhibition does.</p></header>
      <ol>{revisions.map(revision => <li key={`${revision.label}-${revision.title}`}><div><span>{revision.label}</span><time>{revision.date}</time></div><div><h3>{revision.title}</h3><p>{revision.text}</p></div></li>)}</ol>
    </section>

    <section className="about-links"><Link href="/research">Object-first research sweep →</Link><Link href="/sources">Bibliography &amp; sources →</Link><Link href="/rights">Image rights audit →</Link><a href="https://jameshoward.us/contact-me" target="_blank" rel="noreferrer">Corrections &amp; contact ↗</a><Link href="/gallery">Enter the gallery →</Link></section>
  </PageShell>;
}
