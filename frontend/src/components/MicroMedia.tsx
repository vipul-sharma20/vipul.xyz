import type { MicroImage } from '@/lib/content';

interface MicroMediaProps {
  images: MicroImage[];
}

/**
 * Image grid for a single note. Each item is a lightbox trigger; the global
 * handler in layout.tsx groups them by the enclosing data-lightbox-group.
 */
/**
 * Only "portrait" is a distinct case: a tall photo left at its own proportions
 * eats the viewport. Unknown dimensions fall back to the landscape treatment.
 */
function orientation(image: MicroImage): 'portrait' | 'landscape' {
  if (!image.width || !image.height) return 'landscape';
  return image.height > image.width ? 'portrait' : 'landscape';
}

export default function MicroMedia({ images }: MicroMediaProps) {
  if (images.length === 0) return null;

  return (
    <div
      className="micro-media"
      data-count={Math.min(images.length, 4)}
      data-lightbox-group=""
    >
      {images.map((image, i) => (
        <button
          key={image.src}
          type="button"
          className="micro-media-item"
          data-lightbox-src={image.src}
          data-lightbox-alt={image.alt}
          data-orientation={orientation(image)}
          aria-label={image.alt ? `Open photo: ${image.alt}` : `Open photo ${i + 1}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            width={image.width}
            height={image.height}
          />
        </button>
      ))}
    </div>
  );
}
