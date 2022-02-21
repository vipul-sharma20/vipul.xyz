import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > .site-wrapper > nav,
        body > div > .site-wrapper > footer { display: none !important; }
        .site-wrapper, .site-main { display: block !important; padding: 0 !important; margin: 0 !important; max-width: none !important; }
        html, body { background: #1a1a1a !important; overflow: hidden !important; }
      `}</style>
      {children}
    </>
  );
}
