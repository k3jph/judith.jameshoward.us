import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders production metadata without a development placeholder", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /class="wordmark-mark" aria-hidden="true"><\/span>/);
  assert.doesNotMatch(html, /class="wordmark-mark"[^>]*>J</);
  assert.match(html, /judith\.jameshoward\.us/);
  assert.match(html, /A website of/);
  assert.match(html, /href="https:\/\/jameshoward\.us"[^>]*>James Howard<\/a>/);
  assert.match(html, /jh-badge-1x1\.svg/);
  assert.doesNotMatch(html, /Curated by James P\. Howard, II/);
  assert.match(html, /id="gdpr-cookie"/);
  assert.match(html, /Google Analytics will not load unless you accept/);
  assert.match(html, /data-cookie-preferences/);
  assert.match(html, /href="\/privacy"/);
});

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${path}-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders a rights-blocked work as a linked text-only record", async () => {
  const response = await render("/artworks/kehinde-wiley-judith");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Image not available/);
  assert.match(html, /Follow the object link/);
  assert.match(html, /North Carolina Museum of Art/);
  assert.match(html, /304\.8 × 228\.3 × 5\.1 cm/);
  assert.match(html, /Open the cited record/);
});

test("keeps the corrected Klimt catalogue link", async () => {
  const response = await render("/artworks/klimt-judith-i");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /sammlung\.belvedere\.at\/objects\/3492\/judith/);
  assert.doesNotMatch(html, /objects\/4737\/judith-i/);
  assert.match(html, /called the figure Salome/);
});

test("renders the corrected story and chronological context", async () => {
  const story = await (await render("/story")).text();
  assert.match(story, /hold out five more days/);
  assert.match(story, /orders the townspeople to hang it/);
  assert.match(story, /leader of the Ammonites/);
  assert.match(story, /stages a private banquet and sends his chamberlain Bagoas/);
  assert.match(story, /announces a plan she refuses to disclose, then withdraws and prays/);
  assert.match(story, /is circumcised, and joins Israel/);
  assert.match(story, /never feeds Holofernes cheese/);
  assert.match(story, /daughter of Yohanan the High Priest/);
  assert.match(story, /around 100 BCE/);
  assert.doesNotMatch(story, /hang it on the wall at dawn/);
  assert.doesNotMatch(story, /After four days of celebration/);

  const timeline = await (await render("/timeline")).text();
  assert.match(timeline, />1495</);
  assert.match(timeline, /1275–2021/);
  assert.doesNotMatch(timeline, />1494</);
});

test("includes the ceremonial Judith as a text-only object", async () => {
  const response = await render("/artworks/yeshiva-hanukkah-lamp-judith");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Yeshiva University Museum/);
  assert.match(html, /Hanukkah Lamp with Judith/);
  assert.match(html, /Open the cited record/);
});

test("renders both zoomable geography modes", async () => {
  const response = await render("/map");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Made here/);
  assert.match(html, /Held here/);
  assert.match(html, /Map zoom controls/);
  assert.match(html, /Untitled #228/);
  assert.match(html, /omitted from Made/);
});

test("orders the century filter chronologically", async () => {
  const html = await (await render("/gallery")).text();
  const eighteenth = html.indexOf("18th century");
  const nineteenth = html.indexOf("19th century");
  const twentieth = html.indexOf("20th century");
  assert.ok(eighteenth > -1 && nineteenth > eighteenth && twentieth > nineteenth);
});

test("renders the personal curatorial statement and AI disclosure", async () => {
  const response = await render("/about");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /This is that room/);
  assert.match(html, /James P\. Howard, II/);
  assert.match(html, /AI-assisted exhibition/);
  assert.match(html, /Revision history/);
  assert.match(html, /9 August 2026/);
  assert.match(html, /Ca’ Pesaro dimensions/);
  assert.match(html, /Corrections &amp; contact/);
  assert.match(html, /jameshoward\.us\/contact-me/);
});

test("explains the recensions without claiming verse alignment", async () => {
  const response = await render("/read");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /WEBBE/);
  assert.match(html, /different textual recensions/);
  assert.match(html, /not verse-aligned/);
  assert.match(html, /Textual crosswalk/);
  assert.match(html, /WEBBE chapter 13 ends at verse 20/);
});

test("uses exact records and de-duplicates object evidence", async () => {
  const cleveland = await (await render("/artworks/cleveland-bible-initial")).text();
  assert.match(cleveland, /c\. 1275–1300/);
  assert.match(cleveland, /clevelandart\.org\/art\/2008\.2\.194\.a/);

  const giorgione = await (await render("/artworks/giorgione-judith")).text();
  assert.match(giorgione, /some catalogues give 66\.5 cm wide/);
  assert.match(giorgione, /NGA catalogue note connecting the Raphael Judith/);
  assert.doesNotMatch(giorgione, /Hermitage collection record/);

  const klimt = await (await render("/artworks/klimt-judith-ii")).text();
  assert.match(klimt, /176 × 46 cm/);
  assert.match(klimt, /visitmuve\.it\/capolavoro\/gustav-klimt-giuditta-ii-salome/);

  const caravaggio = await (await render("/artworks/caravaggio-judith")).text();
  assert.match(caravaggio, /Palazzo Barberini collection and exhibition history/);
  assert.match(caravaggio, /Official Kimbell loan record/);
  assert.doesNotMatch(caravaggio, /caravaggio-eccehomo\.com/);

  const sources = await (await render("/sources")).text();
  assert.match(sources, /explicitly labelled surrogate/);
  assert.match(sources, /Third-party biographical note and artist statement/);
  assert.match(sources, /navigart\.fr\/museedartsdenantes\/artwork\/virginia-da-vezzi-judith/);
  assert.match(sources, /museivaticani\.va\/content\/museivaticani\/en\/collezioni\/musei\/cappella-sistina\/volta\/pennacchi\/giuditta-e-oloferne/);
});

test("adds media-specific interpretation and its evidence", async () => {
  const html = await (await render("/interpretation")).text();
  assert.match(html, /A print is not merely a smaller painting/);
  assert.match(html, /Counter-Reformation/);
  assert.match(html, /JUDITH UND HOLOFERNES/);
  assert.match(html, /10\.11647\/obp\.0009\.19/);
});

test("shows an open research agenda rather than an inflated audit count", async () => {
  const response = await render("/research");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /What the current sweep/);
  assert.match(html, /Medieval object worlds/);
  assert.doesNotMatch(html, />854</);
});

test("renders the privacy notice and consent controls", async () => {
  const response = await render("/privacy");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Privacy &amp; Cookie Notice/);
  assert.match(html, /cookieConsent/);
  assert.match(html, /Global Privacy Control/);
  assert.match(html, /Google Analytics will not load, contact Google, or set analytics cookies unless/);
  assert.match(html, /Last updated: August 11, 2026/);
});

test("gates the configured Analytics property behind affirmative consent", () => {
  const component = readFileSync(new URL("../app/components/cookie-consent.tsx", import.meta.url), "utf8");
  const manager = readFileSync(new URL("../public/gdpr-cookie.js", import.meta.url), "utf8");
  assert.match(component, /G-TBZHGJKPHW/);
  assert.match(component, /cookieConsent/);
  assert.match(component, /365/);
  assert.match(manager, /globalPrivacyControl/);
  assert.match(manager, /analytics_storage: "granted"/);
  assert.match(manager, /ad_storage: "denied"/);
  assert.match(manager, /allow_google_signals: false/);
  assert.match(manager, /deleteAnalyticsCookies/);
  assert.match(manager, /googletagmanager\.com\/gtag\/js\?id=/);
});
