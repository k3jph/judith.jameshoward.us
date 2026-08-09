"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArtworkVisual } from "../components/artwork-visual";
import { artworks, type Artwork } from "../data/exhibition";

type View = "wall" | "chronology" | "narrative";

function mediumCategory(work: Artwork) {
  const medium = work.medium.toLowerCase();
  if (/bronze|terracotta|alabaster|ivory|marble|sculpture/.test(medium)) return "Sculpture";
  if (/vellum|parchment|manuscript|album page/.test(medium)) return "Manuscript & album";
  if (/engraving|etching|woodcut|pen|ink|wash|drawing|watercolor|watercolour/.test(medium)) return "Works on paper";
  if (/tapestry|wool warp|textile/.test(medium)) return "Textile";
  if (/staghorn|enamel|powder flask|jewel|metalwork/.test(medium)) return "Decorative arts";
  if (/fresco|mural/.test(medium)) return "Fresco & mural";
  return "Painting";
}

function WorkCard({ work, favorite, toggleFavorite }: { work: Artwork; favorite: boolean; toggleFavorite: (slug: string) => void }) {
  return <article className="work-card">
    <Link href={`/artworks/${work.slug}`} className={`work-card-image ${work.imageFile ? "" : "work-card-image--text"}`}><ArtworkVisual work={work} /><span>Open object record →</span></Link>
    <div className="work-card-meta"><div><p>{work.dateDisplay} · {work.medium}</p><h2><Link href={`/artworks/${work.slug}`}>{work.title}</Link></h2><p className="work-artist">{work.artist}</p></div><button className={favorite ? "favorite active" : "favorite"} onClick={() => toggleFavorite(work.slug)} aria-label={`${favorite ? "Remove" : "Add"} ${work.title} ${favorite ? "from" : "to"} favorites`} aria-pressed={favorite}>◇</button></div>
  </article>;
}

export default function GalleryClient() {
  const [query, setQuery] = useState(""); const [century, setCentury] = useState("All centuries"); const [scene, setScene] = useState("All scenes"); const [medium, setMedium] = useState("All media"); const [view, setView] = useState<View>("wall"); const [favorites, setFavorites] = useState<string[]>([]); const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { const timer = window.setTimeout(() => { const p = new URLSearchParams(location.search); setQuery(p.get("q") || ""); setCentury(p.get("century") || "All centuries"); setScene(p.get("scene") || "All scenes"); setMedium(p.get("medium") || "All media"); if (["wall","chronology","narrative"].includes(p.get("view") || "")) setView(p.get("view") as View); setFavorites(JSON.parse(localStorage.getItem("fatal-image-favorites") || "[]")); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === "/" && document.activeElement?.tagName !== "INPUT") { e.preventDefault(); searchRef.current?.focus(); } }; addEventListener("keydown", handler); return () => removeEventListener("keydown", handler); }, []);
  useEffect(() => { const p = new URLSearchParams(); if (query) p.set("q", query); if (century !== "All centuries") p.set("century", century); if (scene !== "All scenes") p.set("scene", scene); if (medium !== "All media") p.set("medium", medium); if (view !== "wall") p.set("view", view); history.replaceState(null, "", `${location.pathname}${p.size ? `?${p}` : ""}`); }, [query, century, scene, medium, view]);
  const centuries = ["All centuries", ...new Set(artworks.map(w => w.century))].sort((a,b) => a === "All centuries" ? -1 : b === "All centuries" ? 1 : Number.parseInt(a) - Number.parseInt(b)); const scenes = ["All scenes", ...new Set(artworks.map(w => w.scene))]; const media = ["All media", ...new Set(artworks.map(mediumCategory))];
  const filtered = useMemo(() => artworks.filter(w => { const haystack = [w.title,w.artist,w.collection,w.medium,w.scene,w.region,w.movement,...w.themes,w.shortLabel].join(" ").toLowerCase(); const type = mediumCategory(w); return (!query || haystack.includes(query.toLowerCase())) && (century === "All centuries" || w.century === century) && (scene === "All scenes" || w.scene === scene) && (medium === "All media" || type === medium); }).sort((a,b) => view === "narrative" ? a.sceneOrder - b.sceneOrder || a.dateStart - b.dateStart : a.dateStart - b.dateStart), [query,century,scene,medium,view]);
  const toggleFavorite = (slug: string) => setFavorites(prev => { const next = prev.includes(slug) ? prev.filter(x => x !== slug) : [...prev,slug]; localStorage.setItem("fatal-image-favorites", JSON.stringify(next)); return next; });
  const clear = () => { setQuery(""); setCentury("All centuries"); setScene("All scenes"); setMedium("All media"); };
  const grouped = view === "narrative" ? Object.entries(filtered.reduce((acc,w) => { (acc[w.scene] ||= []).push(w); return acc; }, {} as Record<string,Artwork[]>)) : [];

  return <div className="gallery-experience">
    <div className="gallery-tools"><label className="gallery-search"><span>Search the exhibition</span><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Artist, work, museum, theme…" /><kbd>/</kbd></label>
      <div className="filter-row"><label><span>Century</span><select value={century} onChange={e => setCentury(e.target.value)}>{centuries.map(x => <option key={x}>{x}</option>)}</select></label><label><span>Narrative moment</span><select value={scene} onChange={e => setScene(e.target.value)}>{scenes.map(x => <option key={x}>{x}</option>)}</select></label><label><span>Medium</span><select value={medium} onChange={e => setMedium(e.target.value)}>{media.map(x => <option key={x}>{x}</option>)}</select></label><button onClick={clear}>Reset</button></div>
    </div>
    <div className="gallery-viewbar"><p><b>{filtered.length}</b> works in view</p><div role="group" aria-label="Gallery view"><button className={view === "wall" ? "active" : ""} onClick={() => setView("wall")}>Wall</button><button className={view === "chronology" ? "active" : ""} onClick={() => setView("chronology")}>Chronology</button><button className={view === "narrative" ? "active" : ""} onClick={() => setView("narrative")}>Narrative</button></div></div>
    {filtered.length === 0 ? <div className="empty-gallery"><p>No Judith meets those conditions.</p><button onClick={clear}>Clear the filters</button></div> : view === "narrative" ? <div className="narrative-groups">{grouped.map(([name,works]) => <section key={name}><header><p className="eyebrow">Narrative moment</p><h2>{name}</h2><span>{works[0].chapter}</span></header><div className="gallery-wall">{works.map(w => <WorkCard key={w.slug} work={w} favorite={favorites.includes(w.slug)} toggleFavorite={toggleFavorite} />)}</div></section>)}</div> : <div className={view === "chronology" ? "gallery-wall gallery-wall--chronology" : "gallery-wall"}>{filtered.map(w => <WorkCard key={w.slug} work={w} favorite={favorites.includes(w.slug)} toggleFavorite={toggleFavorite} />)}</div>}
  </div>;
}
