import { getTags } from '@/lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by tag.',
};

export default function TagsPage() {
  const tags = getTags();
  return (
    <>
      <h1 className="page-title">Tags</h1>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={`/tags/${encodeURIComponent(tag.name)}`} className="tag-capsule">
              {tag.name} <span className="tag-count">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
