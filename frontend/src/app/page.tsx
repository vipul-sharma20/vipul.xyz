import { getPosts } from '@/lib/content';
import PostList from '@/components/PostList';
import Link from 'next/link';

export default function HomePage() {
  const posts = getPosts();

  return (
    <>
      <p className="section-intro">
        Longer, supposedly more thought-out posts about things I build or text
        that I want to share. Mostly technical, sometimes not. Look at
        {' '}<Link href="/scribbles">/scribbles</Link>{' '}
        for less polished writing, and at my microblog,
        {' '}<Link href="/micro">/micro</Link>,
        where I post frequently.
      </p>
      <PostList posts={posts} />
    </>
  );
}
