'use client';

import { useEffect, useState } from 'react';
import JoyPlot from './JoyPlot';
import ShareBar from './ShareBar';

const SOURCE_URL = 'https://s3.vipul.xyz/blog/listening.json';

type Aggregated = {
  generatedAt: string;
  recent: {
    range: [string, string];
    artists: string[];
    totals: Record<string, number>;
    stats: { plays: number; uniqueArtists: number; activeDays: number };
  };
  timeline: {
    artists: string[];
    weeks: { weekStart: string; counts: Record<string, number> }[];
  };
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function fmtDay(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}
function fmtRange([from, to]: [string, string]): string {
  const fromMonth = Number(from.split('-')[1]);
  const toMonth = Number(to.split('-')[1]);
  if (fromMonth === toMonth) return `${fmtDay(from)} – ${to.split('-')[2]}`;
  return `${fmtDay(from)} – ${fmtDay(to)}`;
}

export default function ListeningClient() {
  const [data, setData] = useState<Aggregated | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Try the cached response first, then bust the cache once if the
      // schema doesn't match (a previous publish lingering in browser/CDN
      // cache could otherwise crash the page mid-deploy).
      for (const init of [{ cache: 'default' as RequestCache }, { cache: 'no-store' as RequestCache }]) {
        const url = init.cache === 'no-store' ? `${SOURCE_URL}?v=${Date.now()}` : SOURCE_URL;
        const r = await fetch(url, init);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = (await r.json()) as Aggregated;
        if (j?.recent && j?.timeline) {
          if (!cancelled) setData(j);
          return;
        }
      }
      throw new Error('unexpected payload shape');
    }
    load().catch((e: Error) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return <p className="section-intro">Couldn&rsquo;t load listening data ({error}).</p>;
  }
  if (!data) {
    return <p className="section-intro" aria-busy="true">Loading…</p>;
  }

  const weekPoints = data.timeline.weeks.map((w) => ({ date: w.weekStart, counts: w.counts }));

  const firstYear = data.timeline.weeks[0]?.weekStart.slice(0, 4);
  const currentYear = new Date().getUTCFullYear();
  const yearSpanLabel = firstYear && Number(firstYear) !== currentYear
    ? `${firstYear}–${currentYear}`
    : (firstYear ?? `${currentYear}`);

  const { plays, uniqueArtists, activeDays } = data.recent.stats;
  const recentMeta = [
    fmtRange(data.recent.range),
    `${plays} ${plays === 1 ? 'play' : 'plays'}`,
    `${uniqueArtists} ${uniqueArtists === 1 ? 'artist' : 'artists'}`,
    `${activeDays} active ${activeDays === 1 ? 'day' : 'days'}`,
  ].join(' · ');

  return (
    <>
      <section className="listening-section">
        <h2>Recent</h2>
        <p className="listening-week-range">{recentMeta}</p>
        {data.recent.artists.length === 0 ? (
          <p className="listening-empty">Quiet stretch.</p>
        ) : (
          <ShareBar artists={data.recent.artists} totals={data.recent.totals} />
        )}
      </section>

      <section className="listening-section">
        <h2>{yearSpanLabel}</h2>
        <p className="listening-section-note">
          Top {data.timeline.artists.length} artists across the year.
        </p>
        <JoyPlot artists={data.timeline.artists} points={weekPoints} granularity="week" />
      </section>
    </>
  );
}
