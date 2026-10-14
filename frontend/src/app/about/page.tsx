import StaticPage from '@/components/StaticPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Vipul Sharma.',
};

export default function AboutPage() {
  return <StaticPage slug="about" />;
}
