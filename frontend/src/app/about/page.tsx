import { getPage } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';
import AuthorSidebar from '@/components/AuthorSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Vipul Sharma.',
};

export default async function AboutPage() {
  const page = getPage('about');
  if (!page) return <p>Unable to load this page.</p>;
  const html = await renderMarkdown(page.raw_markdown);
  return (
    <div className="post-with-author">
      <AuthorSidebar />
      <div className="post-content-area">
        <h1 className="page-title">{page.title}</h1>
        <PostContent html={html} />
      </div>
    </div>
  );
}
