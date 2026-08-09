"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArtworkVisual } from "../components/artwork-visual";
import scripture from "../data/scripture.json";
import { artworks } from "../data/exhibition";

type Translation = "web" | "douay"; type VerseMap = Record<string,string>; type BookMap = Record<string,VerseMap>;
const books = { web: scripture.web as BookMap, douay: scripture.douay as BookMap };
const labels = { web: "World English Bible, British Edition (WEBBE)", douay: "Douay-Rheims / Challoner" };
export default function ReadClient() {
  const [chapter,setChapter] = useState(13); const [primary,setPrimary] = useState<Translation>("web"); const [parallel,setParallel] = useState(false); const [search,setSearch] = useState("");
  useEffect(() => { const timer = window.setTimeout(() => { const p = new URLSearchParams(location.search); const c = Number(p.get("chapter")); if (c >= 1 && c <= 16) setChapter(c); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { const p = new URLSearchParams(location.search); p.set("chapter",String(chapter)); history.replaceState(null,"",`${location.pathname}?${p}`); }, [chapter]);
  const verses = books[primary][chapter] || {}; const secondary: Translation = primary === "web" ? "douay" : "web"; const art = artworks.filter(w => w.chapter.includes(String(chapter))).slice(0,4);
  const chapterCrosswalk = chapter === 13
    ? "Douay-Rheims 13:27–31 continues with Achior’s recognition of the head. WEBBE chapter 13 ends at verse 20 and places Achior’s summons, recognition, account, and circumcision at 14:5–10."
    : chapter === 14
      ? "WEBBE 14:5–10 contains Achior’s summons, recognition, and circumcision. Douay-Rheims places the recognition at 13:27–31 and the circumcision at 14:6."
      : null;
  const results = useMemo(() => search.length < 3 ? [] : Object.entries(books[primary]).flatMap(([c,vs]) => Object.entries(vs).filter(([,text]) => text.toLowerCase().includes(search.toLowerCase())).map(([v,text]) => ({c:Number(c),v,text}))).slice(0,30), [search,primary]);
  const go = (c:number,v?:string) => { setChapter(c); setSearch(""); setTimeout(() => v && document.getElementById(`v-${v}`)?.scrollIntoView({behavior:"smooth",block:"center"}),50); };
  return <div className="reader">
    <aside className="reader-sidebar"><div className="reader-sticky"><p className="eyebrow">Table of contents</p><div className="chapter-grid">{Array.from({length:16},(_,i)=>i+1).map(c => <button key={c} className={chapter===c?"active":""} onClick={()=>setChapter(c)} aria-label={`Chapter ${c}`}>{c}</button>)}</div><label className="reader-search"><span>Search this translation</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Judith…" /></label>{results.length>0 && <div className="search-results">{results.map(r=><button key={`${r.c}-${r.v}`} onClick={()=>go(r.c,r.v)}><b>{r.c}:{r.v}</b> {r.text.slice(0,92)}…</button>)}</div>}<div className="translation-note"><p>Both texts are public domain, but these are different textual recensions, not the same book with different verse numbers. Chapter contents do not correspond consistently, and the columns are not verse-aligned.</p><p>The WEBBE follows the Septuagint tradition. The Douay-Rheims follows Jerome's much shorter, reordered, and morally amplified Vulgate, made from a now-lost source he described as Aramaic.</p></div></div></aside>
    <section className="reading-pane"><div className="reader-controls"><label><span>Translation</span><select value={primary} onChange={e=>setPrimary(e.target.value as Translation)}><option value="web">World English Bible, British Edition</option><option value="douay">Douay-Rheims</option></select></label><label className="parallel-toggle"><input type="checkbox" checked={parallel} onChange={e=>setParallel(e.target.checked)} /><span>Parallel mode</span></label></div>
      <header className="chapter-title"><p>The Book of Judith</p><h2>Chapter {chapter}</h2><span>{labels[primary]} · Public domain</span></header>
      {chapterCrosswalk && <div className="chapter-crosswalk"><b>Textual crosswalk</b><p>{chapterCrosswalk}</p></div>}
      {parallel && <div className="recension-alert"><b>Read across, not line by line.</b><p>The columns show each tradition's chapter independently. Chapter contents do not correspond consistently, and the verses are not aligned: Douay-Rheims 13:27–31 contains the Achior episode found in the Greek tradition at WEBBE 14:6–10.</p></div>}
      <div className={parallel?"verse-columns parallel":"verse-columns"}><div className="translation-column"><h3>{labels[primary]}</h3>{Object.entries(verses).map(([v,text])=><p id={`v-${v}`} key={v}><a href={`#v-${v}`} aria-label={`Chapter ${chapter}, verse ${v}`}>{v}</a>{text}</p>)}</div>{parallel&&<div className="translation-column secondary"><h3>{labels[secondary]}</h3>{Object.entries(books[secondary][chapter]||{}).map(([v,text])=><p key={v}><span>{v}</span>{text}</p>)}</div>}</div>
      <nav className="chapter-nav">{chapter>1?<button onClick={()=>setChapter(chapter-1)}>← Chapter {chapter-1}</button>:<span/>}<button onClick={()=>setChapter(Math.min(16,chapter+1))} disabled={chapter===16}>Chapter {chapter+1} →</button></nav>
      {art.length>0&&<section className="passage-art"><p className="eyebrow">Art beside the text</p><h2>Works connected to chapter {chapter}</h2><div>{art.map(w=><Link href={`/artworks/${w.slug}`} key={w.slug}><ArtworkVisual work={w}/><span>{w.artist}<i>{w.title}</i></span></Link>)}</div></section>}
      <footer className="text-credit"><p><b>Text sources:</b> World English Bible, British Edition (WEBBE), with Deuterocanon, public domain; Douay-Rheims Bible, Challoner Revision, Project Gutenberg eBook 8318, public domain in the United States. For the textual-history distinction, see <a href="https://books.openedition.org/obp/26464" target="_blank" rel="noreferrer"><i>The Sword of Judith</i>'s index of the Greek and Vulgate recensions ↗</a>.</p></footer>
    </section>
  </div>;
}
