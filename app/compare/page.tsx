import type { Metadata } from "next";
import { PageShell, SectionIntro } from "../components/site-chrome";
import CompareClient from "./compare-client";
export const metadata:Metadata={title:"Compare Judiths",description:"Place two Judith and Holofernes artworks side by side with synchronized zoom, metadata, and curatorial analysis."};
export default function ComparePage(){return <PageShell className="compare-page"><SectionIntro eyebrow="The comparison room" title="Two images. One story."><p>Change the moment, century, or viewer's distance and the moral temperature shifts. Put the works under the same light.</p></SectionIntro><CompareClient/></PageShell>}
