'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBoxProps {
  initialQuery?: string;
}

export default function SearchBox({ initialQuery = '' }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((q: string) => {
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  }, [router]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  function handleChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        performSearch(value);
      }
    }, 300);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    performSearch(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        autoFocus
      />
    </form>
  );
}
