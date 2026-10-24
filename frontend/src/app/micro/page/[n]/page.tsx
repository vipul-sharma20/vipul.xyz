import type { Metadata } from 'next';
import MicroIndex from '@/components/MicroIndex';
import { getMicroPageCount } from '@/lib/content';

type Props = {
  params: Promise<{ n: string }>;
};

export const dynamicParams = false;

// Page 1 is emitted too, though nothing links to it, because `output: 'export'`
// fails the build on a dynamic route with no params, which is what a stream of
// one page would otherwise produce. Its canonical points at /micro/.
export function generateStaticParams() {
  return Array.from({ length: getMicroPageCount() }, (_, i) => ({ n: String(i + 1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `Micro, page ${n}`,
    description: 'Microblog, passing thoughts.',
    alternates: {
      ...(n === '1' && { canonical: '/micro/' }),
      types: { 'application/rss+xml': '/micro/feed.xml' },
    },
  };
}

export default async function MicroPageN({ params }: Props) {
  const { n } = await params;
  return <MicroIndex page={Number(n)} />;
}
