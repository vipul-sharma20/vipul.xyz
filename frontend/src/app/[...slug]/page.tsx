import type { Metadata } from 'next';
import { getAllPostPaths, getPostByPath } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';
import AuthorSidebar from '@/components/AuthorSidebar';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllPostPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostByPath(slug);
  if (!post) return { title: 'Post Not Found' };

  const description = post.excerpt || `${post.title} — Vipul Sharma`;
  const ogImage = (post.meta.image as string) || post.thumbnail || undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(ogImage && { images: [{ url: ogImage }] }),
      ...(post.date && { publishedTime: post.date }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostByPath(slug);
  if (!post) return <p>Post not found.</p>;

  const html = await renderMarkdown(post.raw_markdown);
  const showAuthor = post.meta.author_profile !== false;

  const content = (
    <>
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {post.tags.length > 0 && (
            <>
              {' '}&middot;{' '}
              {post.tags.map((tag, i) => (
                <span key={tag}>
                  <Link href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule">{tag}</Link>
                  {i < post.tags.length - 1 && ' '}
                </span>
              ))}
            </>
          )}
        </div>
      </header>

      <PostContent html={html} />

      {post.tags.length > 0 && (
        <div className="post-tags">
          <span className="post-tags-label">Tagged</span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule">{tag}</Link>
          ))}
        </div>
      )}
    </>
  );

  if (!showAuthor) return content;

  return (
    <div className="post-with-author">
      <AuthorSidebar />
      <div className="post-content-area">
        {content}
      </div>
    </div>
  );
}
