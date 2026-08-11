import type { MetadataRoute } from "next";
import { artworks } from "./data/exhibition";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{const base="https://judith.jameshoward.us";const pages=["","/gallery","/story","/map","/research","/interpretation","/why-judith","/read","/timeline","/tours","/compare","/artists","/sources","/rights","/about","/privacy"];return [...pages.map(url=>({url:`${base}${url}`})),...artworks.map(w=>({url:`${base}/artworks/${w.slug}`}))]}
