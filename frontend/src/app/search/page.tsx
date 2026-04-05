'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  collection: string;
  tags: string[];
  date: string | null;
  permalink: string | null;
  body: string;
}

function resultUrl(result: SearchEntry): string {
  if (result.permalink) return result.permalink;
  if (result.collection === 'posts' && result.date) {
    const d = new Date(result.date);
    return `/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${result.slug}`;
  }
  if (result.collection === 'music') return `/music/${result.slug}`;
  if (result.collection === 'printing') return `/threedee/${result.slug}`;
  if (result.collection === 'albums') return `/gallery/${result.slug}`;
  return `/${result.slug}`;
}

export default function SearchPage() {
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);

  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then(data => setIndex(data))
      .catch(() => {});
  }, []);

  const fuse = useMemo(() => {
    if (index.length === 0) return null;
    return new Fuse(index, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'tags', weight: 2 },
        { name: 'excerpt', weight: 1.5 },
        { name: 'body', weight: 1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [index]);

  useEffect(() => {
    if (query.trim().length < 2 || !fuse) { setResults([]); return; }
    const matched = fuse.search(query, { limit: 20 }).map(r => r.item);
    setResults(matched);
  }, [query, fuse]);

  return (
    <>
      <h1 className="page-title">Search</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
      />

      {query.trim().length >= 2 && (
        <>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '1em' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
          <ul className="post-list">
            {results.map((result) => (
              <li key={result.slug} className="post-list-item">
                <div className="post-list-title">
                  <Link href={resultUrl(result)}>{result.title}</Link>
                  <span className="search-result-badge">{result.collection}</span>
                </div>
                {result.excerpt && (
                  <div className="post-list-excerpt">{result.excerpt}</div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
