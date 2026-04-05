'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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

interface PreviewData {
  title: string;
  date: string | null;
  tags: string[];
  excerpt: string;
  body: string;
}

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [searchIndex, setSearchIndex] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load search index once
  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then(data => setSearchIndex(data))
      .catch(() => {});
  }, []);

  // Build Fuse instance when index loads
  const fuse = useMemo(() => {
    if (searchIndex.length === 0) return null;
    return new Fuse(searchIndex, {
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
  }, [searchIndex]);

  // Open/close with Cmd+K / Ctrl+K or custom event from nav
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function handleOpenSearch() {
      setOpen(true);
    }
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleOpenSearch);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setPreview(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Update preview when selected result changes
  useEffect(() => {
    if (results.length === 0 || !results[selectedIndex]) {
      setPreview(null);
      return;
    }

    const result = results[selectedIndex];
    setPreview({
      title: result.title,
      date: result.date,
      tags: result.tags || [],
      excerpt: result.excerpt || '',
      body: (result.body || '').slice(0, 800),
    });
  }, [results, selectedIndex]);

  // Scroll selected result into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const active = resultsRef.current.querySelector('.cmdk-result-active');
    if (active) {
      active.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Fuzzy search with Fuse.js
  const doSearch = useCallback((q: string) => {
    if (q.trim().length < 2 || !fuse) {
      setResults([]);
      setPreview(null);
      return;
    }
    setLoading(true);
    const matched = fuse.search(q, { limit: 10 }).map(r => r.item);
    setResults(matched);
    setSelectedIndex(0);
    setLoading(false);
  }, [fuse]);

  function handleInputChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(value), 200);
  }

  function getResultUrl(result: SearchEntry): string {
    if (result.permalink) return result.permalink;
    if (result.collection === 'posts' && result.date) {
      const d = new Date(result.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      return `/${year}/${month}/${result.slug}`;
    }
    if (result.collection === 'music') return `/music/${result.slug}`;
    if (result.collection === 'printing') return `/threedee/${result.slug}`;
    if (result.collection === 'albums') return `/gallery/${result.slug}`;
    return `/${result.slug}`;
  }

  function navigateToResult(result: SearchEntry) {
    setOpen(false);
    router.push(getResultUrl(result));
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateToResult(results[selectedIndex]);
    }
  }

  if (!open) return null;

  const hasResults = results.length > 0;
  const showEmpty = query.trim().length >= 2 && !loading && results.length === 0;

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-dialog" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input-wrap">
          <svg className="cmdk-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmdk-input"
            placeholder="Search posts..."
            value={query}
            onChange={e => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="cmdk-kbd">esc</kbd>
        </div>

        {(hasResults || loading || showEmpty) && (
          <div className="cmdk-body">
            {/* Results list */}
            <div className="cmdk-results" ref={resultsRef}>
              {loading && results.length === 0 && (
                <div className="cmdk-empty">Searching...</div>
              )}
              {showEmpty && (
                <div className="cmdk-empty">No results for &ldquo;{query}&rdquo;</div>
              )}
              {results.map((result, i) => (
                <button
                  key={result.slug}
                  className={`cmdk-result ${i === selectedIndex ? 'cmdk-result-active' : ''}`}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <div className="cmdk-result-info">
                    <span className="cmdk-result-title">{result.title}</span>
                    {result.date && (
                      <span className="cmdk-result-date">{formatDate(result.date)}</span>
                    )}
                  </div>
                  <span className="cmdk-result-collection">{result.collection}</span>
                </button>
              ))}
            </div>

            {/* Preview pane */}
            {hasResults && (
              <div className="cmdk-preview">
                {preview && (
                  <>
                    <div className="cmdk-preview-title">{preview.title}</div>
                    {preview.date && (
                      <div className="cmdk-preview-meta">{formatDate(preview.date)}</div>
                    )}
                    {preview.tags.length > 0 && (
                      <div className="cmdk-preview-tags">
                        {preview.tags.map(t => (
                          <span key={t} className="cmdk-preview-tag">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="cmdk-preview-body">{preview.body}</div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
