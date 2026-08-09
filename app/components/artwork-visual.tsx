import { artworkImage, type Artwork } from "../data/exhibition";
import type { CSSProperties } from "react";

type ArtworkVisualProps = {
  work: Artwork;
  className?: string;
  loading?: "eager" | "lazy";
  decorative?: boolean;
  imageStyle?: CSSProperties;
};

export function ArtworkVisual({ work, className = "", loading = "lazy", decorative = false, imageStyle }: ArtworkVisualProps) {
  if (work.imageFile) {
    return <img className={className} src={artworkImage(work.slug)} alt={decorative ? "" : work.alt} loading={loading} style={imageStyle} />;
  }

  return <div className={`text-record-visual ${className}`.trim()} role="img" aria-label={decorative ? undefined : work.alt} aria-hidden={decorative || undefined}>
    <span>Text-only record</span>
    <strong>Image not available<br />for reuse</strong>
    <small>{work.location}</small>
  </div>;
}
