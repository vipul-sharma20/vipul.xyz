'use client';

import { useState } from 'react';
import { useChartPalette } from '@/lib/useChartPalette';

type Props = {
  /** Top artists, ordered most → least. */
  artists: string[];
  /** Per-artist play count for the window. */
  totals: Record<string, number>;
};

export default function ShareBar({ artists, totals }: Props) {
  const palette = useChartPalette();
  const [hovered, setHovered] = useState<number | null>(null);
  const total = artists.reduce((s, a) => s + (totals[a] ?? 0), 0);
  if (total === 0) return null;

  return (
    <div className={`share-bar${hovered !== null ? ' has-hover' : ''}`}>
      <div className="share-bar-track" role="img" aria-label="Share of listening by artist">
        {artists.map((name, i) => {
          const count = totals[name] ?? 0;
          const pct = (count / total) * 100;
          const color = palette.colors[Math.min(i, palette.colors.length - 1)];
          return (
            <div
              key={name}
              className={`share-bar-seg${hovered === i ? ' is-active' : ''}`}
              style={{ width: `${pct}%`, backgroundColor: color }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </div>
      <ul className="share-legend">
        {artists.map((name, i) => {
          const count = totals[name] ?? 0;
          const color = palette.colors[Math.min(i, palette.colors.length - 1)];
          return (
            <li
              key={name}
              className={`share-legend-item${hovered === i ? ' is-active' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="share-legend-dot" style={{ backgroundColor: color }} aria-hidden="true" />
              <span className="share-legend-name">{name}</span>
              <span className="share-legend-count">{count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
