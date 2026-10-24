import Link from 'next/link';
import MicroStream, { type StreamEntry } from '@/components/MicroStream';
import {
  getMicroImages,
  getMicroPage,
  getMicroPageCount,
  getMicroPageUrl,
  getUrlPath,
} from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';

/**
 * One page of the /micro stream. `/micro/` is page 1; `/micro/page/N/` serves
 * the rest, both as standalone pages and as what the load-more button fetches.
 */
export default async function MicroIndex({ page }: { page: number }) {
  const total = getMicroPageCount();

  const stream: StreamEntry[] = await Promise.all(
    getMicroPage(page).map(async note => ({
      slug: note.slug,
      url: getUrlPath(note),
      date: note.date as string,
      tags: note.tags,
      html: await renderMarkdown(note.raw_markdown),
      images: getMicroImages(note),
    })),
  );

  return (
    <>
      {page === 1 ? (
        <p className="section-intro">
          Microblog, passing thoughts. This page has its own <a href="/micro/feed.xml">feed</a>.
        </p>
      ) : (
        <p className="section-intro">
          Older notes from <Link href="/micro/">Micro</Link>, page {page} of {total}.
        </p>
      )}
      <MicroStream notes={stream} older={page < total ? getMicroPageUrl(page + 1) : null} />
    </>
  );
}
