import { getCollection } from '@/lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Printing',
  description: '3D printing projects and experiments.',
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ThreeDeePage() {
  const items = getCollection('printing');
  return (
    <>
      <h1 className="page-title">3D Printing</h1>
      <p className="section-intro">
        These are some (not all) of the things I&apos;ve 3D printed.
      </p>
      <div className="collection-grid">
        {items.map((item) => (
          <div key={item.slug} className="collection-tile">
            <Link href={`/threedee/${item.slug}`} className="collection-item">
              {item.thumbnail && <img src={item.thumbnail} alt={item.title} loading="lazy" />}
              <div className="collection-item-title">{item.title}</div>
              {item.excerpt && <div className="collection-item-excerpt">{item.excerpt}</div>}
              {item.date && (
                <div className="collection-item-date">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {formatDate(item.date)}
                </div>
              )}
            </Link>
            {item.tags.length > 0 && (
              <div className="collection-item-tags">
                {item.tags.map(tag => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="collection-item-tag">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
