'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';

interface LoadedNote {
  key: string;
  html: string;
}

interface MicroLoadMoreProps {
  /** The server-rendered <li> notes of this page. */
  children: ReactNode;
  /** URL of the next page of older notes, or null on the last page. */
  older: string | null;
  /** Month label of the last note on this page, to avoid repeating its marker. */
  lastMonth: string | null;
}

/**
 * Owns the stream's <ol> so that notes fetched from older pages join the same
 * list as the server-rendered ones, and `.note:last-child` stays correct.
 *
 * The button is a real link to the next static page: without JS, or if the
 * fetch fails, it navigates there instead. With JS it fetches that page,
 * lifts its notes out of the HTML and appends them.
 */
export default function MicroLoadMore({ children, older, lastMonth }: MicroLoadMoreProps) {
  const [loaded, setLoaded] = useState<LoadedNote[]>([]);
  const [next, setNext] = useState(older);
  const [loading, setLoading] = useState(false);
  const month = useRef(lastMonth);
  const list = useRef<HTMLOListElement>(null);
  const focusIndex = useRef<number | null>(null);

  // A keyboard user's focus would otherwise stay on the button, which has just
  // moved below everything that loaded. Hand it to the first new note.
  useEffect(() => {
    if (focusIndex.current === null) return;
    const note = list.current?.children[focusIndex.current];
    note?.querySelector<HTMLElement>('.micro-time')?.focus({ preventScroll: true });
    focusIndex.current = null;
  }, [loaded]);

  async function loadOlder(event: MouseEvent<HTMLAnchorElement>) {
    // Leave modified clicks alone so "open in new tab" still works.
    if (!next || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    if (loading) return;

    // detail is 0 when the click came from Enter rather than a pointer.
    const fromKeyboard = event.detail === 0;
    setLoading(true);
    try {
      const response = await fetch(next);
      if (!response.ok) throw new Error(`${response.status} ${next}`);
      const page = new DOMParser().parseFromString(await response.text(), 'text/html');

      const notes = Array.from(page.querySelectorAll('.micro-stream > .note'), (note, i) => {
        // Every page opens with a month marker. When that month carries on
        // from the notes already shown, the marker would be a repeat.
        const marker = note.querySelector('.micro-month-marker');
        if (marker) {
          if (marker.textContent === month.current) marker.remove();
          else month.current = marker.textContent;
        }
        const permalink = note.querySelector('.micro-time')?.getAttribute('href');
        return { key: permalink ?? `${next}#${i}`, html: note.innerHTML };
      });

      if (fromKeyboard) focusIndex.current = list.current?.children.length ?? null;
      setLoaded(previous => [...previous, ...notes]);
      setNext(page.querySelector('[data-micro-older]')?.getAttribute('href') ?? null);
    } catch {
      window.location.assign(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ol className="micro-stream" ref={list}>
        {children}
        {loaded.map(note => (
          <li key={note.key} className="note" dangerouslySetInnerHTML={{ __html: note.html }} />
        ))}
      </ol>
      {next && (
        <a
          href={next}
          className="micro-more"
          data-micro-older=""
          aria-busy={loading}
          onClick={loadOlder}
        >
          {loading ? 'Loading…' : 'Load older notes'}
        </a>
      )}
    </>
  );
}
