// Shared lazy search loader.
//
// Fuse.js and the 72KB search index are only pulled in on demand — the first
// time something actually searches (Cmd+K opened, or the /search page used).
// Both the index fetch and the Fuse instance are memoized at module scope, so
// CommandSearch and the /search route share a single fetch + a single index
// instead of each doing their own on every page load.

import type Fuse from 'fuse.js';

export interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  collection: string;
  tags: string[];
  date: string | null;
  permalink: string | null;
  url: string;
  body: string;
}

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'tags', weight: 2 },
    { name: 'excerpt', weight: 1.5 },
    { name: 'body', weight: 1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

// Memoized so repeated callers reuse the same promise (single fetch + single
// Fuse instance for the whole session).
let fusePromise: Promise<Fuse<SearchEntry>> | null = null;

async function loadFuse(): Promise<Fuse<SearchEntry>> {
  if (!fusePromise) {
    fusePromise = (async () => {
      // Dynamic import keeps Fuse.js out of the initial page bundle.
      const [{ default: Fuse }, entries] = await Promise.all([
        import('fuse.js'),
        fetch('/search-index.json').then(r => r.json() as Promise<SearchEntry[]>),
      ]);
      return new Fuse(entries, FUSE_OPTIONS);
    })();
    // If it fails, let the next caller retry rather than caching the rejection.
    fusePromise.catch(() => {
      fusePromise = null;
    });
  }
  return fusePromise;
}

/**
 * Warm the index/Fuse instance ahead of the first query (e.g. when the search
 * modal opens) so the first keystroke feels instant. Safe to call repeatedly.
 */
export function warmSearch(): void {
  void loadFuse();
}

/**
 * Run a fuzzy search. Loads Fuse + the index on first use.
 * Returns [] for queries shorter than the min length or if loading fails.
 */
export async function search(query: string, limit: number): Promise<SearchEntry[]> {
  if (query.trim().length < 2) return [];
  try {
    const fuse = await loadFuse();
    return fuse.search(query, { limit }).map(r => r.item);
  } catch {
    return [];
  }
}
