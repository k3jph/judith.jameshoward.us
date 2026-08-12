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
  assert.match(timeline, /1230–2021/);
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
  assert.match(html, /is omitted because its record does not identify a workshop city/);
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
  assert.match(html, /Revision 04/);
  assert.match(html, /12 August 2026/);
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
  assert.match(giorgione, /nga\.gov\/artworks\/1181-judith-head-holofernes/);
  assert.doesNotMatch(giorgione, /Hermitage collection record/);

  const mantegna = await (await render("/artworks/mantegna-follower-judith")).text();
  assert.match(mantegna, /Andrea Mantegna or follower \(possibly Giulio Campagnola\)/);
  assert.match(mantegna, /1942\.9\.42/);

  const botticelli = await (await render("/artworks/botticelli-return-bethulia")).text();
  assert.match(botticelli, /Tempera on wood/);

  const klimt = await (await render("/artworks/klimt-judith-ii")).text();
  assert.match(klimt, /176 × 46 cm/);
  assert.match(klimt, /visitmuve\.it\/capolavoro\/gustav-klimt-giuditta-ii-salome/);

  const caravaggio = await (await render("/artworks/caravaggio-judith")).text();
  assert.match(caravaggio, /Palazzo Barberini collection index/);
  assert.match(caravaggio, /Palazzo Barberini exhibition history and collection context/);
  assert.match(caravaggio, /Kimbell 2025–26 loan record/);
  assert.doesNotMatch(caravaggio, /caravaggio-eccehomo\.com/);
  assert.doesNotMatch(caravaggio, /gebart\.it/);

  const sources = await (await render("/sources")).text();
  assert.match(sources, /explicitly labelled surrogate/);
  assert.match(sources, /Third-party biographical note and artist statement/);
  assert.match(sources, /navigart\.fr\/museedartsdenantes\/artwork\/virginia-da-vezzi-judith/);
  assert.match(sources, /museivaticani\.va\/content\/museivaticani\/en\/collezioni\/musei\/cappella-sistina\/volta\/pennacchi\/giuditta-e-oloferne/);
});

test("adds media-specific interpretation and its evidence", async () => {
  const html = await (await render("/interpretation")).text();
  assert.match(html, /A print is not merely a smaller painting/);
  assert.match(html, /Barthel Beham/);
  assert.match(html, /Coornhert after Heemskerck/);
  assert.match(html, /Goltzius after Spranger/);
  assert.match(html, /Galle after Rubens/);
  assert.match(html, /Virgin overcoming the Devil/);
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
  assert.match(html, /Sixty-four objects/);
  assert.match(html, /Six prints now establish/);
  assert.doesNotMatch(html, />854</);
});

test("expands the medieval and reproductive-print evidence", async () => {
  const gallery = await (await render("/gallery")).text();
  for (const slug of [
    "cleveland-leber-initial",
    "fitzwilliam-speculum-judith",
    "beham-judith",
    "coornhert-judith",
    "goltzius-judith",
    "galle-rubens-judith",
  ]) assert.match(gallery, new RegExp(slug));

  const speculum = await (await render("/artworks/fitzwilliam-speculum-judith")).text();
  assert.match(speculum, /Virgin Overcomes the Devil/);
  assert.match(speculum, /MS 43-1950, fol\. 14v/);
  assert.match(speculum, /CC BY-NC-ND 4\.0/);
  assert.match(speculum, /does not reproduce that no-derivatives file/);

  const rights = await (await render("/rights")).text();
  assert.match(rights, /48<\/b><span>displayed images/);
  assert.match(rights, /16<\/b><span>text-only records/);
  assert.match(rights, /64<\/b><span>works still counted/);
});

test("puts reuse terms and cited scholarship on relevant object pages", async () => {
  for (const slug of ["donatello-judith", "allori-judith"]) {
    const html = await (await render(`/artworks/${slug}`)).text();
    assert.match(html, /Image reuse:[\s\S]{0,100}CC BY-SA 4\.0/);
    assert.match(html, /creativecommons\.org\/licenses\/by-sa\/4\.0/);
  }

  const cranach = await (await render("/artworks/cranach-met-judith")).text();
  assert.match(cranach, /Koepplin and Falk catalogue/);
  const klimt = await (await render("/artworks/klimt-judith-i")).text();
  assert.match(klimt, /Natter, Gustav Klimt/);
  assert.match(klimt, /Mieke Bal on Judith/);
  const wiley = await (await render("/artworks/kehinde-wiley-judith")).text();
  assert.match(wiley, /Eugenie Tsai/);

  const sources = await (await render("/sources")).text();
  assert.match(sources, /Jenkins, Catherine, Nadine M\. Orenstein, and Freyda Spira/);
  assert.doesNotMatch(sources, /Donald J\. LaRocca/);
  assert.match(sources, /263–281/);
});

test("serves a canonical text sitemap", async () => {
  const response = await render("/sitemap.xml");
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/i);
  assert.match(xml, /https:\/\/judith\.jameshoward\.us\/artworks\/galle-rubens-judith/);
  assert.doesNotMatch(xml, /chatgpt\.site/);
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
