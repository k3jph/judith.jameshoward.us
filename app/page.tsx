import Link from "next/link";
import { Footer, Header } from "./components/site-chrome";
import { artworks, artworkImage, featuredSlugs, tours } from "./data/exhibition";

const featured = featuredSlugs.map((slug) => artworks.find((work) => work.slug === slug)!);
const originWork = artworks.find((work) => work.slug === "bigot-walters-judith")!;
const representedCenturies = new Set(artworks.map(work => work.century)).size;
const narrativeMoments = new Set(artworks.map(work => work.scene)).size;

export default function Home() {
  return <><Header transparent /><main id="main">
    <section className="hero">
      <img className="hero-image" src={artworkImage("caravaggio-judith")} alt="" fetchPriority="high" />
      <div className="hero-vignette" /><div className="hero-content">
        <p className="hero-overline"><span /> A virtual exhibition <span /></p>
        <h1><span>Judith</span><i>&amp;</i><span>Holofernes</span></h1><p className="hero-subtitle">The Fatal Image</p>
        <p className="hero-deck">A widow enters an enemy camp. A general loses his head.<br />Artists across eight represented centuries decide what it means.</p>
        <div className="hero-actions"><Link className="button button--primary" href="/gallery">Enter the exhibition <span>→</span></Link><Link className="button button--ghost" href="/story">Read the story</Link></div>
      </div>
      <div className="hero-caption"><span>On view</span> Caravaggio, <i>Judith Beheading Holofernes</i>, c. 1599–1600</div><a className="scroll-cue" href="#threshold"><span>Begin</span><i /></a>
    </section>

    <section id="threshold" className="threshold section-pad">
      <div className="threshold-number">750+</div><div className="threshold-copy"><p className="eyebrow">The enduring subject</p><h2>Years of beauty,<br />violence, and argument</h2>
      <p>Judith never stays still. She is biblical deliverer, civic liberator, virtuous widow, political assassin, beautiful danger, and feminist problem. The paintings do not illustrate one agreed meaning. They stage the fight over it.</p>
      <Link className="text-link" href="/why-judith">Why artists returned to Judith <span>→</span></Link></div>
      <dl className="threshold-stats"><div><dt>{artworks.length}</dt><dd>studied works</dd></div><div><dt>{representedCenturies}</dt><dd>represented centuries</dd></div><div><dt>{narrativeMoments}</dt><dd>narrative moments</dd></div><div><dt>2</dt><dd>complete translations</dd></div></dl>
    </section>

    <section className="origin-story section-pad"><div className="origin-story-image"><img src={artworkImage(originWork.slug)} alt={originWork.alt} loading="lazy" /><span>The Walters Art Museum · Baltimore</span></div><div><p className="eyebrow">Where this exhibition began</p><h2>A candlelit<br />first encounter</h2><p>This is the Judith that introduced curator James P. Howard, II to the subject. The Walters painting’s inverted Holofernes, waking into horror beneath Judith’s steady hand, is not just another addition to the checklist. It is the personal point of origin for the entire exhibition.</p><blockquote>“{originWork.shortLabel}”</blockquote><Link className="button button--outline" href={`/artworks/${originWork.slug}`}>Enter the Walters room →</Link></div></section>

    <section className="dialogues section-pad"><header className="section-heading"><div><p className="eyebrow">Three rooms, three arguments</p><h2>The image changes<br />when the moment changes</h2></div><p>The same verses can yield recoil, teamwork, or erotic command. Start with the works that changed what later artists thought Judith could be.</p></header>
      <div className="dialogue-grid">{featured.map((work, index) => <Link className={`dialogue-card dialogue-card--${index + 1}`} href={`/artworks/${work.slug}`} key={work.slug}><figure><img src={artworkImage(work.slug)} alt={work.alt} loading={index ? "lazy" : "eager"} /><span className="work-index">0{index + 1}</span></figure><div><p>{work.dateDisplay}</p><h3>{work.artist}</h3><p className="dialogue-title"><i>{work.title}</i></p><span>Enter the room →</span></div></Link>)}</div>
    </section>

    <section className="story-portal section-pad"><div className="story-image-wrap"><img src={artworkImage("botticelli-return-bethulia")} alt="Botticelli's Judith strides home with a sword while her maid carries the head." loading="lazy" /><span className="image-note">Botticelli, c. 1470<br />The return to Bethulia</span></div>
      <div className="story-copy"><p className="eyebrow">Before the paintings</p><blockquote>“The Lord will visit Israel<br />by my hand.”</blockquote><p>Judith is introduced not as a seductress but as a respected, independent widow who corrects the city's leaders, designs a military deception, and refuses to disclose it. The head comes later.</p>
      <div className="story-links"><Link href="/story"><span>I</span><b>The story in seven movements</b><i>→</i></Link><Link href="/read?chapter=13"><span>II</span><b>Read the Book of Judith</b><i>→</i></Link><Link href="/interpretation"><span>III</span><b>Judith through time</b><i>→</i></Link></div></div>
    </section>

    <section className="tours-preview section-pad"><header className="section-heading section-heading--center"><div><p className="eyebrow">Curated paths</p><h2>Choose a way<br />through the dark</h2></div></header><div className="tour-list">{tours.map((tour, index) => <Link href={`/tours#${tour.slug}`} key={tour.slug}><span className="tour-number">{String(index + 1).padStart(2, "0")}</span><div><p>{tour.kicker}</p><h3>{tour.title}</h3></div><p>{tour.description}</p><i>→</i></Link>)}</div><div className="tour-actions"><Link className="button button--outline" href="/tours">View curated tours</Link><Link className="button button--outline" href="/map">Explore the maps</Link></div></section>

    <section className="closing-room"><img src={artworkImage("klimt-judith-i")} alt="" loading="lazy" /><div><p className="eyebrow">The central question</p><h2>Why this story?</h2><p>Because it places beauty and violence in one figure, makes the apparently weak decisive, and refuses to tell later viewers whether they should admire, fear, desire, or become Judith.</p><Link className="button button--primary" href="/why-judith">Enter the essay →</Link></div></section>
  </main><Footer /></>;
}
