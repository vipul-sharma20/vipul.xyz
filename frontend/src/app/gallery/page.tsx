import { getCollectionItems } from '@/lib/content';
import type { Metadata } from 'next';
import GalleryView from './GalleryView';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photo albums and galleries.',
};

function getCoverImage(meta: Record<string, unknown>): string | null {
  if (meta.cover_image && typeof meta.cover_image === 'string') return meta.cover_image;
  if (meta.photos && Array.isArray(meta.photos) && meta.photos.length > 0) {
    const first = meta.photos[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object') {
      const p = first as Record<string, string>;
      return p.image || p.path || p.url || null;
    }
  }
  return null;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  cover: string | null;
  tags: string[];
  location?: string;
}

export default function GalleryPage() {
  const items = getCollectionItems('albums');

  const albums: GalleryAlbum[] = items.map(item => ({
    slug: item.slug,
    title: item.title,
    cover: item.thumbnail || getCoverImage(item.meta),
    tags: item.tags,
    location: (item.meta.location as string) || undefined,
  }));

  // Collect all unique tags across albums
  const allTags = Array.from(new Set(albums.flatMap(a => a.tags))).sort();

  return (
    <>
      <h1 className="page-title">Gallery</h1>
      <GalleryView albums={albums} allTags={allTags} />
    </>
  );
}
