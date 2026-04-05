import type { Metadata } from 'next';
import { getTagPosts, getTags } from '@/lib/content';
import PostList from '@/components/PostList';

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map(t => ({ tag: t.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged "${decodeURIComponent(tag)}"` };
}

export default async function TagPostsPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const items = getTagPosts(decoded);
  return (
    <>
      <h1 className="page-title">Posts tagged &ldquo;{decoded}&rdquo;</h1>
      <PostList posts={items} />
    </>
  );
}
