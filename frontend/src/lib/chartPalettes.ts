/**
 * Chart palettes for the /listening area chart.
 * Dev-only switcher in DevPanel; production ships with the default below.
 */

export type ChartPalette = {
  id: string;
  name: string;
  description: string;
  /** 8 colors used for the 8 stacked bands, bottom (top artist) → top (8th). */
  colors: string[];
  /** Color used for non-highlighted bands when one artist is selected. */
  dimColor: string;
  /** Color used for the highlighted band. */
  highlightColor: string;
};

// Palette 1: Mono-sienna ramp — tints of the warm-sienna accent.
const MONO_SIENNA: ChartPalette = {
  id: 'mono-sienna',
  name: 'Mono Sienna',
  description: 'Tints of the site accent. Bottom = top artist.',
  colors: [
    '#a0522d', // 100% sienna — top artist
    '#ad6a4a',
    '#b88566',
    '#c39d83',
    '#cdb19f',
    '#d6c2b6',
    '#dfd1c8',
    '#e7ddd6', // palest — 8th artist
  ],
  dimColor: '#d6c8be',
  highlightColor: '#a0522d',
};

// Palette 2: Ink on paper — every band the same warm grey.
const INK_ON_PAPER: ChartPalette = {
  id: 'ink-on-paper',
  name: 'Ink on Paper',
  description: 'One shape. Click an artist to reveal.',
  colors: Array(8).fill('#9c8e80'),
  dimColor: '#cdc4ba',
  highlightColor: '#a0522d',
};

// Palette 3: Newsprint — alternating sienna / ink by stack order.
const NEWSPRINT: ChartPalette = {
  id: 'newsprint',
  name: 'Newsprint',
  description: 'Alternating sienna and ink stripes.',
  colors: [
    '#a0522d', '#6a6056',
    '#a0522d', '#6a6056',
    '#a0522d', '#6a6056',
    '#a0522d', '#6a6056',
  ],
  dimColor: '#cfc7be',
  highlightColor: '#a0522d',
};

// Palette 4: Sepia ramp — warmer/softer than mono-sienna, vintage print feel.
const SEPIA: ChartPalette = {
  id: 'sepia',
  name: 'Sepia',
  description: 'Soft ramp from deep sienna to cream.',
  colors: [
    '#7a3e1f',
    '#8f5236',
    '#a36a4f',
    '#b58468',
    '#c69d83',
    '#d5b6a0',
    '#e2cfbd',
    '#ede4d3',
  ],
  dimColor: '#d6c8be',
  highlightColor: '#7a3e1f',
};

// Palette 5: Two-tone — top 4 sienna, next 4 slate. "Core" vs "secondary".
const TWO_TONE: ChartPalette = {
  id: 'two-tone',
  name: 'Two-Tone',
  description: 'Top 4 sienna, next 4 slate.',
  colors: [
    '#a0522d', '#b3724b', '#c4946a', '#d3b18b',  // sienna ramp
    '#4a5f8a', '#6a7ba2', '#8a98b9', '#abb5cd',  // slate ramp
  ],
  dimColor: '#cfc7be',
  highlightColor: '#a0522d',
};

// Palette 6: Quiet rainbow — desaturated multi-color (the current default, kept for comparison).
const QUIET_RAINBOW: ChartPalette = {
  id: 'quiet-rainbow',
  name: 'Quiet Rainbow',
  description: 'Muted multi-color (the original).',
  colors: [
    '#a0522d', '#c08552', '#7d6b48', '#8c6b8b',
    '#5b7a8a', '#a87848', '#6e8a6a', '#b07970',
  ],
  dimColor: '#cfc7be',
  highlightColor: '#a0522d',
};

// Palette 7: Slate ramp — like mono-sienna but using slate-blue theme's accent.
const MONO_SLATE: ChartPalette = {
  id: 'mono-slate',
  name: 'Mono Slate',
  description: 'Tints of slate blue.',
  colors: [
    '#4a5f8a',
    '#5d72a0',
    '#7587b3',
    '#8d9cc1',
    '#a3b0cd',
    '#b8c2d8',
    '#cbd2e0',
    '#dbe0e9',
  ],
  dimColor: '#c8cdda',
  highlightColor: '#4a5f8a',
};

// Palette 8: Greyscale — pure neutral ramp, near-black to fog.
const GREYSCALE: ChartPalette = {
  id: 'greyscale',
  name: 'Greyscale',
  description: 'Pure neutral ramp.',
  colors: [
    '#2b2b2b',
    '#454545',
    '#5e5e5e',
    '#787878',
    '#929292',
    '#aeaeae',
    '#c8c8c8',
    '#dedede',
  ],
  dimColor: '#cfcfcf',
  highlightColor: '#2b2b2b',
};

// Palette 9: Charcoal — slightly warm grey ramp with bigger contrast for stacked legibility.
const CHARCOAL: ChartPalette = {
  id: 'charcoal',
  name: 'Charcoal',
  description: 'Warm-tinted grey ramp, higher contrast.',
  colors: [
    '#262422',
    '#3f3c39',
    '#5a5651',
    '#777269',
    '#948e84',
    '#b0aaa0',
    '#cac4ba',
    '#ddd7cd',
  ],
  dimColor: '#cdc7be',
  highlightColor: '#262422',
};

// Palette 10: Cool Slate — punchier, more saturated slate ramp.
const COOL_SLATE: ChartPalette = {
  id: 'cool-slate',
  name: 'Cool Slate',
  description: 'Deeper, more saturated slate.',
  colors: [
    '#2c3e64',
    '#3d527d',
    '#536892',
    '#6c80a6',
    '#8798b8',
    '#a2b1c8',
    '#bcc8d6',
    '#d3dae3',
  ],
  dimColor: '#c4cad5',
  highlightColor: '#2c3e64',
};

export const chartPalettes: ChartPalette[] = [
  MONO_SLATE,
  COOL_SLATE,
  GREYSCALE,
  CHARCOAL,
  MONO_SIENNA,
  INK_ON_PAPER,
  NEWSPRINT,
  SEPIA,
  TWO_TONE,
  QUIET_RAINBOW,
];

export const defaultChartPalette = COOL_SLATE;

const STORAGE_KEY = 'chart-palette-id';

export function getStoredPaletteId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storePaletteId(id: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

export function findPalette(id: string | null | undefined): ChartPalette {
  if (!id) return defaultChartPalette;
  return chartPalettes.find((p) => p.id === id) ?? defaultChartPalette;
}

/** Custom event emitted when the dev panel changes the palette. */
export const CHART_PALETTE_EVENT = 'chart-palette-change';
