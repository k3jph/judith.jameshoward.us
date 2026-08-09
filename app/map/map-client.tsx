"use client";

import { geoEquirectangular, geoPath } from "d3-geo";
import Link from "next/link";
import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import { ArtworkVisual } from "../components/artwork-visual";
import { artworks } from "../data/exhibition";
import { heldPlacements, madePlacements, type MapPlacement } from "../data/locations";

type Mode = "made" | "held";
type PlaceGroup = { key: string; label: string; lat: number; lon: number; placements: MapPlacement[]; uncertain: boolean };
type View = { x: number; y: number; k: number };
type Drag = { clientX: number; clientY: number; x: number; y: number } | null;

const width = 1000;
const height = 500;
const projection = geoEquirectangular().fitExtent([[8, 8], [width - 8, height - 8]], { type: "Sphere" });
const topology = worldAtlas as unknown as Topology;
const countries = (feature(topology, topology.objects.countries as GeometryCollection) as FeatureCollection).features;
const paths = countries.map(country => geoPath(projection)(country)).filter((path): path is string => Boolean(path));
const workBySlug = new Map(artworks.map(work => [work.slug, work]));

function groupPlaces(placements: MapPlacement[]) {
  const groups = new Map<string, PlaceGroup>();
  for (const placement of placements) {
    const key = placement.label;
    const group = groups.get(key);
    if (group) {
      group.placements.push(placement);
      group.uncertain ||= placement.certainty === "regional";
    } else {
      groups.set(key, { key, label: placement.label, lat: placement.lat, lon: placement.lon, placements: [placement], uncertain: placement.certainty === "regional" });
    }
  }
  return [...groups.values()].sort((a, b) => b.placements.length - a.placements.length || a.label.localeCompare(b.label));
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function MapClient() {
  const [mode, setMode] = useState<Mode>("made");
  const madeGroups = useMemo(() => groupPlaces(madePlacements), []);
  const heldGroups = useMemo(() => groupPlaces(heldPlacements), []);
  const groups = mode === "made" ? madeGroups : heldGroups;
  const [selectedByMode, setSelectedByMode] = useState<Record<Mode, string>>({ made: madeGroups[0].key, held: heldGroups[0].key });
  const [view, setView] = useState<View>({ x: 0, y: 0, k: 1 });
  const [drag, setDrag] = useState<Drag>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const selected = groups.find(group => group.key === selectedByMode[mode]) ?? groups[0];
  const selectedWorks = selected.placements.map(placement => ({ placement, work: workBySlug.get(placement.slug)! }));

  const zoomAt = (nextK: number, cx = width / 2, cy = height / 2) => setView(current => {
    const k = clamp(nextK, 1, 6);
    return { k, x: cx - (cx - current.x) * (k / current.k), y: cy - (cy - current.y) * (k / current.k) };
  });
  const onWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = (event.clientX - rect.left) * (width / rect.width);
    const cy = (event.clientY - rect.top) * (height / rect.height);
    zoomAt(view.k * (event.deltaY < 0 ? 1.28 : 0.78), cx, cy);
  };
  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ clientX: event.clientX, clientY: event.clientY, x: view.x, y: view.y });
  };
  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const unit = width / rect.width;
    setView(current => ({ ...current, x: drag.x + (event.clientX - drag.clientX) * unit, y: drag.y + (event.clientY - drag.clientY) * unit }));
  };

  return <section className="map-experience" aria-label="Artwork geography">
    <div className="map-mode" role="group" aria-label="Choose map">
      <button className={mode === "made" ? "active" : ""} onClick={() => setMode("made")} aria-pressed={mode === "made"}><span>01</span><b>Made here</b><small>Where the works were created</small></button>
      <button className={mode === "held" ? "active" : ""} onClick={() => setMode("held")} aria-pressed={mode === "held"}><span>02</span><b>Held here</b><small>Where the works are now</small></button>
    </div>

    <div className="map-layout">
      <div className="map-stage">
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${mode === "made" ? "Creation" : "Holding"} locations. Drag to pan and use the controls or wheel to zoom.`} onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={() => setDrag(null)} onPointerCancel={() => setDrag(null)}>
          <title>{mode === "made" ? "Where the works were made" : "Where the works are held"}</title>
          <g className="map-zoom-layer" transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            <rect className="map-ocean" width={width} height={height} />
            <g className="map-countries">{paths.map((path, index) => <path d={path} key={index} vectorEffect="non-scaling-stroke" />)}</g>
            {groups.map(group => {
              const point = projection([group.lon, group.lat]); if (!point) return null;
              const size = 42 / view.k;
              return <foreignObject key={group.key} x={point[0] - size / 2} y={point[1] - size / 2} width={size} height={size} className="map-marker-wrap">
                <button
                  className={`map-marker ${selected.key === group.key ? "active" : ""} ${group.uncertain ? "uncertain" : ""}`}
                  style={{ "--marker-scale": view.k } as CSSProperties}
                  onPointerDown={event => event.stopPropagation()}
                  onClick={() => setSelectedByMode(current => ({ ...current, [mode]: group.key }))}
                  aria-label={`${group.label}: ${group.placements.length} ${group.placements.length === 1 ? "work" : "works"}${group.uncertain ? ", regional or cautious placement" : ""}`}
                  aria-pressed={selected.key === group.key}
                ><i /><span>{group.placements.length}</span></button>
              </foreignObject>;
            })}
          </g>
        </svg>
        <div className="map-controls" role="group" aria-label="Map zoom controls">
          <button onClick={() => zoomAt(view.k * 1.5)} aria-label="Zoom in">+</button>
          <button onClick={() => setView({ x: 0, y: 0, k: 1 })}>World</button>
          <button onClick={() => zoomAt(view.k / 1.5)} aria-label="Zoom out">−</button>
        </div>
        <div className="map-zoom-status" aria-live="polite">{Math.round(view.k * 100)}%</div>
        <div className="map-key"><span><i /> Documented place</span><span><i className="regional" /> Regional or cautious placement</span></div>
      </div>

      <aside className="map-place" aria-live="polite">
        <div className="map-place-heading"><p className="eyebrow">{mode === "made" ? "Made here" : "Held here"}</p><h2>{selected.label}</h2><p>{selectedWorks.length} {selectedWorks.length === 1 ? "work" : "works"} in this exhibition</p></div>
        <div className="map-place-works">
          {selectedWorks.map(({ placement, work }) => <Link href={`/artworks/${work.slug}`} key={work.slug}>
            <ArtworkVisual work={work} decorative />
            <div><span>{work.dateDisplay} · {work.medium}</span><h3>{work.title}</h3><p>{work.artist}</p>{mode === "held" && <small>{work.collection}</small>}{placement.note && <small>{placement.note}</small>}</div><b aria-hidden="true">→</b>
          </Link>)}
        </div>
      </aside>
    </div>

    <div className="map-method">
      <p className="eyebrow">How to read the dots</p>
      <div><h2>Precision without false certainty</h2><p>Drag to pan; scroll, pinch, or use the controls to zoom. Holding locations are collection locations, not a claim that every object is on view. A ringed dot marks a regional placement, workshop inference, artist-practice location, private location, or unresolved holder rather than a false street-level certainty.</p></div>
    </div>
  </section>;
}
