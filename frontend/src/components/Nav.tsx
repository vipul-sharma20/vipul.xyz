'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  links: { href: string; label: string }[];
}

// Mobile: these 3 shown inline, rest go in hamburger
const MOBILE_PRIMARY = ['/', '/scribbles', '/about'];

export default function Nav({ links }: NavProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  const mobilePrimary = links.filter(l => MOBILE_PRIMARY.includes(l.href));
  const mobileOverflow = links.filter(l => !MOBILE_PRIMARY.includes(l.href));

  return (
    <nav className="site-nav">
      <Link href="/" className="site-nav-name">
        <img src="/logo.png" alt="Home" width={40} height={40} style={{ display: 'block' }} />
      </Link>

      {/* Desktop nav */}
      <div className="site-nav-desktop">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>{label}</Link>
        ))}
        <span className="site-nav-sep" aria-hidden="true" />
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
          <Link key={href} href={href} className={`site-nav-mobile-link ${isActive(href) ? 'active' : ''}`}>{label}</Link>
        ))}
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
