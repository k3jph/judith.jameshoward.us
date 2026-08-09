import type { Metadata } from "next";
import { PageShell, SectionIntro } from "../components/site-chrome";
import ReadClient from "./read-client";
export const metadata: Metadata = { title: "Read Judith", description: "Read the complete Book of Judith in the WEB British Edition and Douay-Rheims, with recension-aware parallel text and artwork links." };
export default function ReadPage(){return <PageShell className="reader-page"><SectionIntro eyebrow="Two public-domain translations" title="Read Judith"><p>Sixteen chapters, verse anchors, full-text search, and a parallel view that preserves each translation's own numbering.</p></SectionIntro><ReadClient/></PageShell>}
