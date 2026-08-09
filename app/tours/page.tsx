import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SectionIntro } from "../components/site-chrome";
import { artworkImage, getArtwork, tours } from "../data/exhibition";
export const metadata:Metadata={title:"Curated Tours",description:"Guided paths through the Judith and Holofernes exhibition."};
export default function ToursPage(){return <PageShell className="tours-page"><SectionIntro eyebrow="Five mini-exhibitions" title="Curated Tours"><p>Follow an argument rather than a century. Every path is short enough for one visit and open enough to become another.</p></SectionIntro><section className="tour-catalog">{tours.map((tour,i)=><article id={tour.slug} key={tour.slug}><header><span>{String(i+1).padStart(2,"0")}</span><div><p className="eyebrow">{tour.kicker}</p><h2>{tour.title}</h2><p>{tour.description}</p></div><b>{tour.stops.length} stops</b></header><div className="tour-stops">{tour.stops.map((slug,n)=>{const w=getArtwork(slug)!;return <Link href={`/artworks/${slug}`} key={slug}><div className="tour-progress"><span>{n+1}</span><i style={{height:`${((n+1)/tour.stops.length)*100}%`}}/></div><img src={artworkImage(slug)} alt={w.alt} loading="lazy"/><div><p>{w.dateDisplay} · {w.scene}</p><h3>{w.title}</h3><span>{w.artist}</span></div><b>→</b></Link>})}</div></article>)}</section></PageShell>}

