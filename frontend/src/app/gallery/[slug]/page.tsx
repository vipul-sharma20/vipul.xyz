import type { Metadata } from 'next';
import { getCollectionItem, getCollection } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';
import PhotoGrid from '@/components/PhotoGrid';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCollection('albums').map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCollectionItem('albums', slug);
  return { title: item?.title || 'Not Found' };
}

function extractPhotos(meta: Record<string, unknown>): { src: string; alt?: string }[] {
  const photos: { src: string; alt?: string }[] = [];
  if (!meta.photos || !Array.isArray(meta.photos)) return photos;

  for (const photo of meta.photos) {
    if (typeof photo === 'string') {
      photos.push({ src: photo });
    } else if (photo && typeof photo === 'object') {
      const p = photo as Record<string, string>;
      const src = p.image || p.path || p.url;
      if (src) {
        photos.push({ src, alt: p.caption || p.alt || undefined });
      }
    }
  }
  return photos;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function GalleryItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getCollectionItem('albums', slug);
  if (!item) return <p>Album not found.</p>;

  const photos = extractPhotos(item.meta);
  const html = await renderMarkdown(item.raw_markdown);

  return (
    <>
      <header className="album-header">
        <h1>{item.title}</h1>
        {item.excerpt && (
          <p className="album-excerpt">{item.excerpt}</p>
        )}
        <div className="album-meta">
          {item.date && (
            <span className="album-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(item.date)}
            </span>
          )}
          {typeof item.meta.location === 'string' && (
            <span className="album-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {item.meta.location}
            </span>
          )}
        </div>
      </header>

      {photos.length > 0 && <PhotoGrid photos={photos} />}
      {html.trim() && <PostContent html={html} />}
    </>
  );
}
