import type { Metadata } from 'next';
import MicroIndex from '@/components/MicroIndex';

export const metadata: Metadata = {
  title: 'Micro',
  description: 'Microblog, passing thoughts.',
  alternates: {
    types: { 'application/rss+xml': '/micro/feed.xml' },
  },
};

export default function MicroPage() {
  return <MicroIndex page={1} />;
}
