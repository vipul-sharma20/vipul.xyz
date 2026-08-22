import Link from 'next/link';
import MicroMedia from '@/components/MicroMedia';
import {
  type ContentItem,
  formatMicroTimestamp,
  getMicro,
  getMicroImages,
  getUrlPath,
} from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';

/**
 * A single micro entry on its own page, with older/newer navigation.
 *
 * Rendered from the top-level `[...slug]` catch-all rather than a dedicated
 * `micro/[...slug]` route. A dedicated dynamic route would need at least one
 * param to satisfy `output: 'export'`, which made an empty `content/micro/`
 * fail the build; the top-level route always has posts to generate.
 */
export default async function MicroEntry({ note }: { note: ContentItem }) {
  const html = await renderMarkdown(note.raw_markdown);
  const images = getMicroImages(note);

  // getMicro() is newest first, so the previous index is the newer entry.
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
