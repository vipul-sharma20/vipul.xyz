'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  /** Symbol shown instead of the label; the label becomes the accessible name. */
  glyph?: string;
}

interface NavProps {
  links: NavLink[];
}

// Mobile: these word links shown inline, rest go in hamburger. Glyph links are
// always inline — they sit with the icons and cost almost no width.
const MOBILE_PRIMARY = ['/', '/scribbles', '/about'];

function classes(...values: (string | false | undefined)[]): string | undefined {
  const joined = values.filter(Boolean).join(' ');
  return joined || undefined;
}

export default function Nav({ links }: NavProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  // Glyph links are grouped with the search and RSS icons rather than sitting in
  // the run of words, so they read as part of the icon cluster.
  const wordLinks = links.filter(l => !l.glyph);
  const glyphLinks = links.filter(l => l.glyph);
  const mobilePrimary = wordLinks.filter(l => MOBILE_PRIMARY.includes(l.href));
  const mobileOverflow = wordLinks.filter(l => !MOBILE_PRIMARY.includes(l.href));

  const glyphNav = (className?: string) => glyphLinks.map(({ href, label, glyph }) => (
    <Link
      key={href}
      href={href}
      className={classes(className, 'site-nav-glyph', isActive(href) && 'active')}
      aria-label={label}
      title={label}
    >
      {glyph}
    </Link>
  ));

  return (
    <nav className="site-nav">
      <Link href="/" className="site-nav-name">
        <img src="/logo.png" alt="Home" width={40} height={40} style={{ display: 'block' }} />
      </Link>

      {/* Desktop nav */}
      <div className="site-nav-desktop">
        {wordLinks.map(({ href, label }) => (
          <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>{label}</Link>
        ))}
        <span className="site-nav-sep" aria-hidden="true" />
        {glyphNav()}
        <button
          className="site-nav-rss"
          title="Search (⌘K)"
          onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px' }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <a href="/feed.xml" className="site-nav-rss" title="RSS Feed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px' }}>
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </a>
      </div>

      {/* Mobile nav */}
      <div className="site-nav-mobile">
        {mobilePrimary.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={classes('site-nav-mobile-link', isActive(href) && 'active')}
          >
            {label}
          </Link>
        ))}
        {glyphNav('site-nav-mobile-link')}
        <button
          className="site-nav-rss"
          title="Search"
          onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: '-1px' }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <label htmlFor="nav-toggle" className="site-nav-hamburger" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </label>
        <input type="checkbox" id="nav-toggle" className="site-nav-toggle" />
        <div className="site-nav-menu">
          {mobileOverflow.map(({ href, label }) => (
            <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>{label}</Link>
          ))}
          <a href="/feed.xml">RSS</a>
        </div>
      </div>
    </nav>
  );
}
