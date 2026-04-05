import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="not-found-links">
        <Link href="/">Posts</Link>
        <span className="not-found-sep">&middot;</span>
        <Link href="/search">Search</Link>
        <span className="not-found-sep">&middot;</span>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
}
