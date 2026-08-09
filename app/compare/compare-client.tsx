"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArtworkVisual } from "../components/artwork-visual";
import { artworks, getArtwork } from "../data/exhibition";

const pairings = [["caravaggio-judith","artemisia-florence","Distance / force"],["artemisia-naples","artemisia-florence","First thought / revision"],["botticelli-return-bethulia","artemisia-florence","Aftermath / action"],["goya-judith","klimt-judith-i","Darkness / gold"],["cranach-met-judith","klimt-judith-i","Beauty / danger"]];
export default function CompareClient(){
  const [a,setA]=useState("caravaggio-judith"),[b,setB]=useState("artemisia-florence"),[zoomA,setZoomA]=useState(100),[zoomB,setZoomB]=useState(100),[sync,setSync]=useState(true);
  useEffect(()=>{const timer=window.setTimeout(()=>{const p=new URLSearchParams(location.search);if(getArtwork(p.get("a")||""))setA(p.get("a")!);if(getArtwork(p.get("b")||""))setB(p.get("b")!)},0);return()=>window.clearTimeout(timer)},[]);
  useEffect(()=>{const p=new URLSearchParams({a,b});history.replaceState(null,"",`${location.pathname}?${p}`)},[a,b]);
  const wa=getArtwork(a)!,wb=getArtwork(b)!; const setZoom=(side:"a"|"b",n:number)=>{if(side==="a")setZoomA(n);else setZoomB(n);if(sync){setZoomA(n);setZoomB(n)}};
  const rows:[[string,string,string],[string,string,string],[string,string,string],[string,string,string],[string,string,string],[string,string,string]]=[
    ["Date",wa.dateDisplay,wb.dateDisplay],["Narrative moment",wa.scene,wb.scene],["Medium",wa.medium,wb.medium],["Scale",wa.dimensions,wb.dimensions],["Current collection",wa.collection,wb.collection],["Passage",`${wa.chapter}:${wa.verses}`,`${wb.chapter}:${wb.verses}`]
  ];
  return <div className="compare-lab"><div className="selected-comparisons"><p className="eyebrow">Curator's pairings</p>{pairings.map(([x,y,label])=><button key={label} onClick={()=>{setA(x);setB(y)}}>{label}</button>)}</div>
    <div className="compare-selectors"><label><span>Work A</span><select value={a} onChange={e=>setA(e.target.value)}>{artworks.filter(w=>w.slug!==b).map(w=><option value={w.slug} key={w.slug}>{w.artist} — {w.dateDisplay}</option>)}</select></label><span className="versus">versus</span><label><span>Work B</span><select value={b} onChange={e=>setB(e.target.value)}>{artworks.filter(w=>w.slug!==a).map(w=><option value={w.slug} key={w.slug}>{w.artist} — {w.dateDisplay}</option>)}</select></label></div>
    <div className="compare-images"><figure><div><ArtworkVisual work={wa} imageStyle={wa.imageFile?{transform:`scale(${zoomA/100})`}:undefined}/></div><figcaption><b>A</b><span>{wa.artist}<i>{wa.title}</i></span></figcaption></figure><figure><div><ArtworkVisual work={wb} imageStyle={wb.imageFile?{transform:`scale(${zoomB/100})`}:undefined}/></div><figcaption><b>B</b><span>{wb.artist}<i>{wb.title}</i></span></figcaption></figure></div>
    <div className="zoom-controls"><label>A zoom <input type="range" min="100" max="200" value={zoomA} onChange={e=>setZoom("a",Number(e.target.value))} disabled={!wa.imageFile}/></label><label className="sync"><input type="checkbox" checked={sync} onChange={e=>setSync(e.target.checked)}/> Synchronize zoom</label><label>B zoom <input type="range" min="100" max="200" value={zoomB} onChange={e=>setZoom("b",Number(e.target.value))} disabled={!wb.imageFile}/></label></div>
    <section className="comparison-reading"><div><p className="eyebrow">A — curatorial key</p><h2>{wa.scene}</h2><p>{wa.visualAnalysis}</p></div><div><p className="eyebrow">B — curatorial key</p><h2>{wb.scene}</h2><p>{wb.visualAnalysis}</p></div></section>
    <table className="metadata-comparison"><caption>Object records compared</caption><thead><tr><th>Field</th><th>A</th><th>B</th></tr></thead><tbody>{rows.map(([label,x,y])=><tr key={label}><th>{label}</th><td>{x}</td><td>{y}</td></tr>)}</tbody></table>
    <div className="compare-actions"><Link href={`/artworks/${wa.slug}`}>Open A object record →</Link><span>{Math.abs(wb.dateStart-wa.dateStart)} years apart</span><Link href={`/artworks/${wb.slug}`}>Open B object record →</Link></div>
  </div>;
}
