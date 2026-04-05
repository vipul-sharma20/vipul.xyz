import type { Metadata } from 'next';
import { getCollectionItem, getCollection } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCollection('printing').map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCollectionItem('printing', slug);
  return { title: item?.title || 'Not Found' };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function ThreeDeeItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getCollectionItem('printing', slug);
  if (!item) return <p>Item not found.</p>;
  const html = await renderMarkdown(item.raw_markdown);

  return (
    <>
      <header className="post-header">
        <h1>{item.title}</h1>
        <div className="post-meta">
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
          {item.tags.length > 0 && (
            <>
              {' '}&middot;{' '}
              {item.tags.map((tag, i) => (
                <span key={tag}>
                  <Link href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule">{tag}</Link>
                  {i < item.tags.length - 1 && ' '}
                </span>
              ))}
            </>
          )}
        </div>
      </header>

      <PostContent html={html} />

      {item.tags.length > 0 && (
        <div className="post-tags">
          <span className="post-tags-label">Tagged</span>
          {item.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule">{tag}</Link>
          ))}
        </div>
      )}
    </>
  );
}
