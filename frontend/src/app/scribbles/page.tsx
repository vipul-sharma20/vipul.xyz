import { getScribbles } from '@/lib/content';
import PostList from '@/components/PostList';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scribbles',
  description: 'Short notes and quick thoughts.',
};

export default function ScribblesPage() {
  const scribbles = getScribbles();
  return (
    <>
      <p className="section-intro">
        Random scribbles, anything not so refined stuff I want to write and
        share. For more thought-out posts, look at the
        {' '}<Link href="/">Posts</Link>{' '} page.
      </p>
      <PostList posts={scribbles} />
    </>
  );
}
