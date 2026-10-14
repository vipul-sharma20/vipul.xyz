import { getPage } from '@/lib/content';
import StaticPage from '@/components/StaticPage';
import type { Metadata } from 'next';

// Title and description come from content/pages/skit.md, so the page can be
// rewritten without touching this file.
export function generateMetadata(): Metadata {
  const page = getPage('skit');
  return {
    title: page?.title,
    description: page?.excerpt || undefined,
  };
}

export default function SkitPage() {
  return <StaticPage slug="skit" />;
}
