import type { Metadata } from 'next';
import { getCollectionItem, getCollection } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCollection('music').map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCollectionItem('music', slug);
  return { title: item?.title || 'Not Found' };
}

export default async function MusicItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getCollectionItem('music', slug);
  if (!item) return <p>Item not found.</p>;
  const html = await renderMarkdown(item.raw_markdown);
  return (
    <>
      <h1>{item.title}</h1>
      <PostContent html={html} />
    </>
  );
}
