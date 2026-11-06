import { useState } from "react";
import { getSmartNewsCover, isValidCoverUrl } from "@/lib/newsImageResolver";

interface ProtectedImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  category?: string;
  fallbackSrc?: string;
  /** Marks the image as LCP candidate (disables lazy loading). */
  priority?: boolean;
}

/** Only local assets get a .webp sibling — remote URLs are used as-is. */
const webpFor = (src: string) =>
  !/^https?:/i.test(src) && /\.(jpe?g|png)$/i.test(src) ? src.replace(/\.(jpe?g|png)$/i, ".webp") : null;

/**
 * Image with WebP preference, lazy decoding, broken-image fallback and
 * light anti-scraping protection (no drag, no selection, no context menu).
 * If the original image is missing or fails to load, gracefully falls back to
 * a topic-appropriate, high-resolution thematic cover.
 */
const ProtectedImage = ({ src, alt, className, category, fallbackSrc, priority }: ProtectedImageProps) => {
  const [failed, setFailed] = useState(false);

  // If initial src is invalid or failed, use smart cover resolver
  const source =
    !failed && isValidCoverUrl(src)
      ? (src as string)
      : getSmartNewsCover(alt, category, fallbackSrc);

  const webp = webpFor(source);

  return (
    <picture onContextMenu={(e) => e.preventDefault()} className="block w-full h-full">
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={source}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        onError={() => {
          if (!failed) {
            setFailed(true);
          }
        }}
        className={`select-none [-webkit-user-drag:none] ${className ?? ""}`}
      />
    </picture>
  );
};

export default ProtectedImage;
