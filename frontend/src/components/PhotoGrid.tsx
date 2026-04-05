interface Photo {
  src: string;
  alt?: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="photo-grid">
      {photos.map((photo, i) => (
        <button
          key={i}
          type="button"
          className="polaroid"
          data-lightbox-src={photo.src}
          data-lightbox-alt={photo.alt || ''}
          data-lightbox-index={String(i)}
          aria-label={photo.alt ? `Open photo: ${photo.alt}` : `Open photo ${i + 1}`}
        >
          <img
            src={photo.src}
            alt={photo.alt || ''}
            loading="lazy"
          />
          {photo.alt && (
            <div className="polaroid-caption">{photo.alt}</div>
          )}
        </button>
      ))}
    </div>
  );
}
