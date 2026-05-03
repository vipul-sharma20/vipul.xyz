import type { Metadata } from 'next';
import ListeningClient from '@/components/listening/ListeningClient';

export const metadata: Metadata = {
  title: 'Listening',
  description: 'What I have been listening to.',
};

export default function ListeningPage() {
  return (
    <>
      <p className="section-intro">
        Music I&rsquo;ve been listening to lately.
      </p>
      <ListeningClient />
    </>
  );
}
