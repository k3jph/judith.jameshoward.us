import type { Metadata } from "next";
import { PageShell, SectionIntro } from "../components/site-chrome";
import MapClient from "./map-client";

export const metadata: Metadata = {
  title: "Made Here / Held Here",
  description: "Interactive maps of where the exhibition’s Judith and Holofernes works were made and where they are held now.",
};

export default function MapPage() {
  return <PageShell className="map-page">
    <SectionIntro eyebrow="Two object geographies" title="Made Here / Held Here">
      <p>Creation and custody tell different stories. Select a place to see the works gathered there, then switch maps to watch artistic centres become collecting centres. Sixty-two of sixty-four works have a documented or explicitly cautious creation placement; the Fitzwilliam Speculum is omitted because its record does not identify a workshop city, and Cindy Sherman’s <i>Untitled #228</i> because MoMA ties Rome only to the series, not that object.</p>
    </SectionIntro>
    <MapClient />
  </PageShell>;
}
