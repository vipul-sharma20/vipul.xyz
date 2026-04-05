import Link from 'next/link';
import type { PostListItem } from '@/lib/api';

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getYear(dateString: string | null): string | null {
  if (!dateString) return null;
  return String(new Date(dateString).getUTCFullYear());
}

function postUrl(post: PostListItem): string {
  if (post.permalink) return post.permalink;
  if (!post.date) return `/${post.slug}`;
  const date = new Date(post.date);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `/${year}/${month}/${day}/${post.slug}`;
}

interface PostListProps {
  posts: PostListItem[];
}

export default function PostList({ posts }: PostListProps) {
  let lastYear: string | null = null;

  return (
    <ul className="post-list">
      {posts.map((post) => {
        const year = getYear(post.date);
        const showYear = year && year !== lastYear;
        if (year) lastYear = year;

        return (
          <li key={post.slug} className={`post-list-item ${showYear ? 'post-list-year-first' : ''}`}>
            {showYear && <div className="post-list-year-marker">{year}</div>}
            <div className="post-list-title">
              <Link href={postUrl(post)}>{post.title}</Link>
            </div>
            {post.date && (
              <div className="post-list-date">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(post.date)}
              </div>
            )}
            {post.excerpt && (
              <div className="post-list-excerpt">{post.excerpt}</div>
            )}
            {post.tags.length > 0 && (
              <div className="post-list-tags">
                {post.tags.map(tag => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule-sm">{tag}</Link>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
