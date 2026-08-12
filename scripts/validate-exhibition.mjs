import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "app/data/exhibition.ts"), "utf8");
const collectionSource = source.split("export const artworks")[1].split("export const storyEpisodes")[0];
const slugs = [...collectionSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const uniqueSlugs = new Set(slugs);

if (slugs.length !== 64 || uniqueSlugs.size !== slugs.length) {
  throw new Error(`Collection audit failed: expected 64 unique object slugs, found ${uniqueSlugs.size}.`);
}

let imageCount = 0;
let textOnlyCount = 0;
for (const slug of slugs) {
  const start = collectionSource.indexOf(`slug: "${slug}"`);
  const next = collectionSource.indexOf("\n  {", start + 1);
  const entry = collectionSource.slice(start, next === -1 ? undefined : next);
  if (entry.includes("imageFile:")) {
    imageCount += 1;
    const imagePath = resolve(root, "public/artworks", `${slug}.webp`);
    if (!existsSync(imagePath)) throw new Error(`Missing local exhibition image: ${slug}.webp`);
  } else {
    textOnlyCount += 1;
    if (!entry.includes("imageUnavailable:")) throw new Error(`Text-only record is missing its image appeal: ${slug}.`);
  }
  const primarySource = entry.match(/primarySource:\s*"([^"]+)"/)?.[1];
  const researchBlock = entry.match(/researchSources:\s*\[(.*?)\]/s)?.[1] ?? "";
  const researchUrls = [...researchBlock.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
  const recordUrls = primarySource ? [primarySource, ...researchUrls] : researchUrls;
  if (new Set(recordUrls).size !== recordUrls.length) throw new Error(`Source audit failed: ${slug} repeats a record URL.`);
}

for (const field of ["imageRights", "imageLicense", "imageCredit", "primarySource"]) {
  const count = (collectionSource.match(new RegExp(`${field}:`, "g")) || []).length;
  if (count !== slugs.length) throw new Error(`Rights audit failed: ${field} appears ${count} times for ${slugs.length} objects.`);
}

const locationSource = readFileSync(resolve(root, "app/data/locations.ts"), "utf8");
for (const mapName of ["madePlacements", "heldPlacements"]) {
  const mapSection = locationSource.split(`export const ${mapName}`)[1]?.split("export const")[0] ?? "";
  const mapSlugs = [...mapSection.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const intentionallyUnplaced = mapName === "madePlacements" ? ["cindy-sherman-untitled-228", "fitzwilliam-speculum-judith"] : [];
  const expectedCount = slugs.length - intentionallyUnplaced.length;
  if (mapSlugs.length !== expectedCount || new Set(mapSlugs).size !== expectedCount) {
    throw new Error(`Map audit failed: ${mapName} has ${mapSlugs.length} placements; expected ${expectedCount}.`);
  }
  for (const slug of slugs) if (!intentionallyUnplaced.includes(slug) && !mapSlugs.includes(slug)) throw new Error(`Map audit failed: ${mapName} is missing ${slug}.`);
  for (const slug of intentionallyUnplaced) if (mapSlugs.includes(slug)) throw new Error(`Map audit failed: ${mapName} should omit ${slug} until an object-level making place is documented.`);
}

const scripture = JSON.parse(readFileSync(resolve(root, "app/data/scripture.json"), "utf8"));
for (const translation of ["web", "douay"]) {
  const chapters = Object.keys(scripture[translation] || {});
  if (chapters.length !== 16) throw new Error(`Text audit failed: ${translation} has ${chapters.length} chapters.`);
  if (chapters.some((chapter) => Object.keys(scripture[translation][chapter]).length === 0)) {
    throw new Error(`Text audit failed: ${translation} has an empty chapter.`);
  }
}

if (imageCount !== 48 || textOnlyCount !== 16) throw new Error(`Media audit failed: expected 48 images and 16 text-only records; found ${imageCount} and ${textOnlyCount}.`);

console.log(`Exhibition audit passed: ${slugs.length} objects, ${imageCount} local images, ${textOnlyCount} text-only records, 2 complete 16-chapter texts.`);
