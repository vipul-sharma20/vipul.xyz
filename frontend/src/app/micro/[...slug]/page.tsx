import type { Metadata } from 'next';
import Link from 'next/link';
import MicroMedia from '@/components/MicroMedia';
import {
  formatMicroTimestamp,
  getAllMicroPaths,
  getMicroByPath,
  getMicroImages,
  getMicro,
  getUrlPath,
} from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllMicroPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getMicroByPath(slug);
  if (!note) return { title: 'Note Not Found' };

  const image = getMicroImages(note)[0]?.src;

  return {
    title: note.title,
    description: note.title,
    openGraph: {
      title: `Note — ${formatMicroTimestamp(note.date as string)}`,
      description: note.title,
      type: 'article',
      ...(image && { images: [{ url: image }] }),
      ...(note.date && { publishedTime: note.date }),
    },
  };
}

export default async function MicroPage({ params }: Props) {
  const { slug } = await params;
  const note = getMicroByPath(slug);
  if (!note) return <p>Note not found.</p>;

  const html = await renderMarkdown(note.raw_markdown);
  const images = getMicroImages(note);

  // getMicro() is newest first, so the previous index is the newer note.
  const all = getMicro();
  const index = all.findIndex(n => n.slug === note.slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <>
      <p className="section-intro">
        A single note from <Link href="/micro">Micro</Link>.
      </p>

      <article className="micro micro-single">
        <div className="micro-head">
          <time className="micro-time" dateTime={note.date as string}>
            {formatMicroTimestamp(note.date as string)}
          </time>
          {note.tags.map(tag => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule-sm">
              {tag}
            </Link>
          ))}
        </div>
        <div className="micro-body" dangerouslySetInnerHTML={{ __html: html }} />
        <MicroMedia images={images} />
      </article>

      {(newer || older) && (
        <nav className="pagination">
          {older ? <Link href={getUrlPath(older)}>&larr; Older</Link> : <span />}
          {newer ? <Link href={getUrlPath(newer)}>Newer &rarr;</Link> : <span />}
        </nav>
      )}
    </>
  );
}
