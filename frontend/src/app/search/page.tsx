'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { search as runSearch, warmSearch, type SearchEntry } from '@/lib/search';

function resultUrl(result: SearchEntry): string {
  return result.url;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const searchSeq = useRef(0);

  // Warm the shared index/Fuse once the page mounts (the user is here to search).
  useEffect(() => {
    warmSearch();
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return; }
    const seq = ++searchSeq.current;
    runSearch(query, 20).then(matched => {
      if (seq !== searchSeq.current) return;
      setResults(matched);
    });
  }, [query]);

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
