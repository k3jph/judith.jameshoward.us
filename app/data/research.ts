export const researchMetrics = [
  { value: "58", label: "works now interpreted in the gallery" },
  { value: "17", label: "Made-map placements outside Europe" },
  { value: "15", label: "intentional text-only records" },
  { value: "Ongoing", label: "cross-collection discovery sweep" },
] as const;

export const researchGaps = [
  ["Medieval object worlds", "The current gallery still underrepresents sculpture, stained glass, Speculum Humanae Salvationis and Biblia Pauperum cycles, and Judith imagery embedded in liturgical or architectural settings."],
  ["Print networks", "Engravings and woodcuts by Hans Sebald Beham, Georg Pencz, Heinrich Aldegrever, Jacques Callot, and Dutch printmakers require a dedicated copy-and-variation study rather than isolated additions."],
  ["Literary reception", "Old English Judith and Friedrich Hebbel now appear in the interpretation, but the exhibition has not yet mapped how literary retellings changed visual choices across languages."],
  ["Counter-Reformation settings", "Naples, Rome, and Catholic court cultures need closer comparison across sermons, devotion, theatrical painting, and the politics of female exemplarity."],
  ["Jewish ritual and manuscript traditions", "The Yeshiva Hanukkah lamp is now present, but one object cannot stand for the wider history of Judith in Jewish ceremonial art, manuscripts, performance, and regional Hanukkah traditions."],
  ["The second Caravaggio question", "The canvas discovered near Toulouse has been attributed both to Caravaggio and to Louis Finson. It must also be distinguished from the related Judith in Naples, often treated as a copy after a lost Caravaggio composition. The Toulouse work remains outside the gallery until its identity, current record, and image status can be presented without overstating consensus."],
] as const;

export const researchPrinciples = [
  ["Object first", "Searches begin with Judith, Holofernes, episodes, objects, and uses—not a list of famous artists or museums."],
  ["Records are leads", "Aggregator results include duplicates, documentary photographs, copies, texts, and imperfect metadata. Each displayed work is checked against a holding record wherever one is available."],
  ["Difference earns space", "A work enters the gallery when it changes the history through medium, use, geography, episode, attribution, material setting, or cultural migration. Institutional prestige is not a criterion."],
  ["Absence remains visible", "Rights restrictions, missing digitization, uncertain location, and weak cataloguing are recorded as research conditions rather than mistaken for lack of importance. A trustworthy link earns a text-only record."],
] as const;

export const researchLeads = [
  ["Musée Goya, Castres", "Josep Bernat Flaugier, Judith and Holofernes", "A Spanish-school, revolutionary-era interpretation found through France’s national Joconde catalogue, not through a standard Judith canon.", "https://pop.culture.gouv.fr/notice/joconde/05940000365"],
  ["Musée des Ursulines, Mâcon", "Corrado Giaquinto, Judith and Holofernes", "An eighteenth-century theatrical treatment in a municipal collection; publication rights currently limit display here.", "https://pop.culture.gouv.fr/notice/joconde/01720003624"],
  ["Musée municipal, Soissons", "Michelangelo Unterperger, Judith and Holofernes", "A central-European Baroque work whose survival in a regional French collection shifts the map of eighteenth-century reception.", "https://pop.culture.gouv.fr/notice/joconde/M0794014535"],
] as const;

export const discoverySources = [
  ["Europeana cross-collection search", "https://www.europeana.eu/en/search?query=Judith%20Holofernes"],
  ["Wikidata subject index: Judith", "https://www.wikidata.org/wiki/Q26454627"],
  ["Wikidata subject index: Holofernes", "https://www.wikidata.org/wiki/Q625748"],
  ["POP / Joconde, Collections des musées de France", "https://pop.culture.gouv.fr/search/list?base=%5B%22Collections%20des%20mus%C3%A9es%20de%20France%20%28Joconde%29%22%5D&mainSearch=%22Judith%22%20%22Holopherne%22"],
] as const;
