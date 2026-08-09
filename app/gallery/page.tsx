import type { Metadata } from "next";
import { PageShell, SectionIntro } from "../components/site-chrome";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = { title: "Gallery", description: "Browse Judith and Holofernes across eight represented centuries by date, scene, medium, artist, geography, and theme." };
export default function GalleryPage() { return <PageShell className="collection-page"><SectionIntro eyebrow="The complete collection" title="Gallery"><p>Not one image, but a tradition of choices: before the blow, the blade in motion, the head concealed, the heroine displayed. Change the order and the history changes with it.</p></SectionIntro><GalleryClient /></PageShell>; }
