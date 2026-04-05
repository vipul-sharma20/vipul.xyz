'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { GalleryAlbum } from './page';

interface GalleryViewProps {
  albums: GalleryAlbum[];
  allTags: string[];
}

export default function GalleryView({ albums, allTags }: GalleryViewProps) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  function toggleTag(tag: string) {
    setActiveTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const filtered = activeTags.size === 0
    ? albums
    : albums.filter(a =>
        // AND condition: album must have ALL active tags
        Array.from(activeTags).every(at =>
          a.tags.some(t => t.toLowerCase() === at.toLowerCase())
        )
      );

  return (
    <>
      {allTags.length > 0 && (
        <div className="gallery-filters">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`gallery-filter-btn ${activeTags.has(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {filtered.map(album => (
          <Link key={album.slug} href={`/gallery/${album.slug}`} className="gallery-item">
            {album.cover ? (
              <img src={album.cover} alt={album.title} loading="lazy" />
            ) : (
              <div style={{ aspectRatio: '4/3', background: 'var(--bg-secondary)' }} />
            )}
            <div className="gallery-item-label">
              {album.title}
              {album.location && (
                <div className="gallery-item-sublabel">{album.location}</div>
              )}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ gridColumn: '1 / -1', color: 'var(--text-secondary)', fontSize: '14px' }}>
            No albums match the selected tags.
          </p>
        )}
      </div>
    </>
  );
}
