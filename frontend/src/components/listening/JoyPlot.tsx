'use client';

import { useEffect, useRef, useState } from 'react';
import { useChartPalette } from '@/lib/useChartPalette';

type Point = { date: string; counts: Record<string, number> };
type Props = {
  artists: string[];
  points: Point[];
  /** "week" → x-tick is "Apr 28", readout says "Week of Apr 28".
   *  "day"  → x-tick is "Mon", readout says "Mon Apr 28". */
  granularity?: 'week' | 'day';
};

const RIDGE_HEIGHT = 60;   // max amplitude
const ROW_OFFSET = 24;     // gap between baselines
const TOP_PAD = 8;
const BOT_PAD = 28;
const RIGHT_PAD = 12;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function fmtMonth(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}
function fmtWeekday(iso: string) {
  // iso "YYYY-MM-DD" → weekday name. UTC-safe to match how we bucketed.
  const [y, m, d] = iso.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return WEEKDAYS[dow];
}

function smooth(values: number[], radius = 2): number[] {
  const out = new Array(values.length).fill(0);
  for (let i = 0; i < values.length; i++) {
    let sw = 0;
    let sv = 0;
    for (let k = -radius; k <= radius; k++) {
      const j = i + k;
      if (j < 0 || j >= values.length) continue;
      const w = radius + 1 - Math.abs(k);
      sw += w;
      sv += w * values[j];
    }
    out[i] = sw === 0 ? 0 : sv / sw;
  }
  return out;
}

function ridgePath(values: number[], width: number, max: number, baseline: number): string {
  if (values.length === 0) return '';
  const dx = width / Math.max(1, values.length - 1);
  let d = '';
  for (let i = 0; i < values.length; i++) {
    const h = max === 0 ? 0 : (values[i] / max) * RIDGE_HEIGHT;
    const x = i * dx;
    const y = baseline - h;
    d += i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`;
  }
  d += ` L${(values.length - 1) * dx},${baseline} L0,${baseline} Z`;
  return d;
}

export default function JoyPlot({ artists, points, granularity = 'week' }: Props) {
  const palette = useChartPalette();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [containerW, setContainerW] = useState(680);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track container width — re-measure on resize for responsive layout.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    function measure() {
      if (el.clientWidth) setContainerW(el.clientWidth);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Responsive layout: tighter label gutter and smaller fonts on narrow viewports.
  const isNarrow = containerW < 520;
  const LABEL_W = isNarrow ? 90 : 130;
  const labelFontSize = isNarrow ? 10 : 12;
  const tickFontSize = isNarrow ? 10 : 11;

  if (artists.length === 0 || points.length === 0) {
    return <p className="joy-empty">No data for this period.</p>;
  }

  const series = artists.map((a) => smooth(points.map((p) => p.counts[a] ?? 0)));
  const globalMax = Math.max(1, ...series.flat());

  const chartW = Math.max(1, containerW - LABEL_W - RIGHT_PAD);
  const chartH = (artists.length - 1) * ROW_OFFSET + RIDGE_HEIGHT + TOP_PAD + BOT_PAD;
  const dx = chartW / Math.max(1, points.length - 1);

  // X-axis ticks: ~6 ticks on desktop, ~3 on mobile, all 7 in day mode.
  const targetTicks = granularity === 'day' ? points.length : (isNarrow ? 3 : 6);
  const tickStep = Math.max(1, Math.floor(points.length / targetTicks));
  const tickIdxs = points.map((_, i) => i).filter((i) => i % tickStep === 0);

  function fmtTick(iso: string) {
    return granularity === 'day' ? fmtWeekday(iso) : fmtMonth(iso);
  }
  function fmtReadout(iso: string) {
    return granularity === 'day' ? `${fmtWeekday(iso)} ${fmtMonth(iso)}` : `Week of ${fmtMonth(iso)}`;
  }

  function handlePointer(clientX: number, target: SVGSVGElement) {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left - LABEL_W;
    if (x < 0 || x > chartW) { setHoverIdx(null); return; }
    const idx = Math.round(x / dx);
    setHoverIdx(Math.max(0, Math.min(points.length - 1, idx)));
  }

  return (
    <div
      ref={containerRef}
      className="joy-plot"
      onMouseLeave={() => setHoverIdx(null)}
    >
      <svg
        width={containerW}
        height={chartH}
        className="joy-svg"
        onMouseMove={(e) => handlePointer(e.clientX, e.currentTarget)}
        onTouchMove={(e) => {
          if (e.touches.length === 0) return;
          handlePointer(e.touches[0].clientX, e.currentTarget);
        }}
        onTouchEnd={() => setHoverIdx(null)}
      >
        {artists.map((artist, i) => {
          const baseline = TOP_PAD + RIDGE_HEIGHT + i * ROW_OFFSET;
          const color = palette.colors[i % palette.colors.length];
          return (
            <g key={artist} transform={`translate(${LABEL_W}, 0)`}>
              <path
                d={ridgePath(series[i], chartW, globalMax, baseline)}
                fill={color}
                fillOpacity={0.85}
                stroke="var(--bg)"
                strokeWidth={1.2}
              />
            </g>
          );
        })}

        {hoverIdx !== null && (
          <line
            x1={LABEL_W + hoverIdx * dx}
            x2={LABEL_W + hoverIdx * dx}
            y1={TOP_PAD}
            y2={chartH - BOT_PAD}
            stroke="var(--text-secondary)"
            strokeDasharray="2 2"
            strokeWidth={1}
            pointerEvents="none"
          />
        )}

        {artists.map((artist, i) => {
          const baseline = TOP_PAD + RIDGE_HEIGHT + i * ROW_OFFSET;
          return (
            <text
              key={`l-${artist}`}
              x={LABEL_W - 8}
              y={baseline}
              dy="-0.2em"
              fontSize={labelFontSize}
              fontFamily="var(--font-serif)"
              fill="var(--text)"
              textAnchor="end"
            >
              {artist}
            </text>
          );
        })}

        {tickIdxs.map((i) => (
          <text
            key={`t-${i}`}
            x={LABEL_W + i * dx}
            y={chartH - 8}
            fontSize={tickFontSize}
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
            textAnchor="middle"
          >
            {fmtTick(points[i].date)}
          </text>
        ))}
      </svg>

      <div
        className={`joy-readout${hoverIdx === null || !points[hoverIdx] ? ' is-empty' : ''}`}
        aria-live="polite"
      >
        {hoverIdx !== null && points[hoverIdx] ? (
          <>
            <span className="joy-readout-label">{fmtReadout(points[hoverIdx].date)}</span>
            {' · '}
            {artists
              .map((a) => ({ a, v: points[hoverIdx].counts[a] ?? 0 }))
              .filter((x) => x.v > 0)
              .sort((a, b) => b.v - a.v)
              .slice(0, 4)
              .map(({ a, v }) => `${a} ${v}`)
              .join(' · ') || 'no plays'}
          </>
        ) : (
          ' '
        )}
      </div>
    </div>
  );
}
