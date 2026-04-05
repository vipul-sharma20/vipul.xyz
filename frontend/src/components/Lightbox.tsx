'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface Photo {
  src: string;
  alt?: string;
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  const photo = photos[currentIndex];
  const portalRoot = typeof document === 'undefined' ? null : document.body;

  if (!portalRoot) return null;

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      {currentIndex > 0 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous"
        >
          &#8249;
        </button>
      )}

      <img
        className="lightbox-image"
        src={photo.src}
        alt={photo.alt || ''}
        onClick={(e) => e.stopPropagation()}
      />

      {currentIndex < photos.length - 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next"
        >
          &#8250;
        </button>
      )}
    </div>,
    portalRoot,
  );
}
