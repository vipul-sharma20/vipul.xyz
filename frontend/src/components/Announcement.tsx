'use client';

import { usePathname } from 'next/navigation';
import type { SiteConfig } from '@/lib/config';

/**
 * Full-bleed strip above the nav. Rendered as a sibling of `.site-wrapper` so
 * the background can span the viewport while the inner span stays bounded to
 * the content column's width — no negative margins needed.
 *
 * The whole strip is the link, so the tap target is the full row rather than
 * the two words of the CTA.
 *
 * Client-side only for `usePathname`, which is what `hide_on` needs. The config
 * arrives as a prop because `getConfig()` reads config.toml through `fs`.
 */
export default function Announcement({
  announcement,
}: {
  announcement: SiteConfig['announcement'];
}) {
  const pathname = usePathname();

  if (!announcement || announcement.enabled === false) return null;

  const { text, short, link, link_label, hide_on } = announcement;

  // Trailing slashes vary between the dev server and the exported HTML, so
  // compare both sides stripped.
  const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  if (pathname && hide_on?.some((p) => trim(p) === trim(pathname))) return null;

  // A plain <a>, not next/link: the router's soft navigation fires its scroll
  // before the target page has finished laying out, so a link to an anchor low
  // on a page lands short of it. A real navigation hands the fragment to the
  // browser, which keeps adjusting the scroll until load completes.
  // trailingSlash is on, so ask for /about/#contact directly rather than
  // eating a redirect on the way.
  const [linkPath, linkHash] = link.split('#');
  const href = linkPath.startsWith('/')
    ? `${linkPath.replace(/\/?$/, '/')}${linkHash ? `#${linkHash}` : ''}`
    : link;

  return (
    <a href={href} className="site-announcement">
      <span className="site-announcement-inner">
        {/* Only one of these is ever displayed; display: none keeps the hidden
            one out of the accessibility tree too, so it isn't read twice. */}
        <span className="site-announcement-text">{text}</span>
        {short && <span className="site-announcement-text-short">{short}</span>}
        <span className="site-announcement-cta">
          {link_label} <span aria-hidden="true">&rarr;</span>
        </span>
      </span>
    </a>
  );
}
