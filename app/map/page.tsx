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
      <p>Creation and custody tell different stories. Select a place to see the works gathered there, then switch maps to watch artistic centres become collecting centres. Fifty-seven of fifty-eight works have a documented or explicitly cautious creation placement; Cindy Sherman’s <i>Untitled #228</i> is omitted from Made because only the series—not that object—is tied to Rome.</p>
    </SectionIntro>
    <MapClient />
  </PageShell>;
}
