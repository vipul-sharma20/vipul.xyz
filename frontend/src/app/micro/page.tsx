import type { Metadata } from 'next';
import MicroStream, { type StreamEntry } from '@/components/MicroStream';
import { getMicroImages, getMicro, getUrlPath } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Micro',
  description: 'Microblog, passing thoughts.',
  alternates: {
    types: { 'application/rss+xml': '/micro/feed.xml' },
  },
};

export default async function MicroPage() {
  const notes = getMicro().filter(note => note.date);

  const stream: StreamEntry[] = await Promise.all(
    notes.map(async note => ({
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
      <p className="section-intro">
        Microblog, passing thoughts. This page has its own <a href="/micro/feed.xml">feed</a>.
      </p>
      <MicroStream notes={stream} />
    </>
  );
}
