export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    linkVisited: string;
    border: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'minimal-air',
    name: 'Minimal Air',
    colors: {
      bg: '#f1f1f1',
      bgSecondary: '#e6e6e6',
      text: '#181818',
      textSecondary: '#393e46',
      accent: '#4a5f8a',
      accentHover: '#3a4f7a',
      linkVisited: '#181818',
      border: '#cecfd1',
    },
  },
  {
    id: 'warm-sienna',
    name: 'Warm Sienna',
    colors: {
      bg: '#faf8f5',
      bgSecondary: '#f0ece6',
      text: '#2d2a26',
      textSecondary: '#6b6560',
      accent: '#a0522d',
      accentHover: '#8b4226',
      linkVisited: '#7a5c4f',
      border: '#ddd5cb',
    },
  },
  {
    id: 'muted-teal',
    name: 'Muted Teal',
    colors: {
      bg: '#faf8f5',
      bgSecondary: '#edf0ee',
      text: '#2d2a26',
      textSecondary: '#5f6b66',
      accent: '#4a7a6a',
      accentHover: '#3a6355',
      linkVisited: '#5a7a70',
      border: '#d5ddd8',
    },
  },
  {
    id: 'deep-ink',
    name: 'Deep Ink',
    colors: {
      bg: '#faf8f5',
      bgSecondary: '#f0ece6',
      text: '#2d2a26',
      textSecondary: '#6b6560',
      accent: '#3d3530',
      accentHover: '#2d2520',
      linkVisited: '#5a5450',
      border: '#ddd5cb',
    },
  },
  {
    id: 'slate-blue',
    name: 'Slate Blue',
    colors: {
      bg: '#f8f9fb',
      bgSecondary: '#edf0f4',
      text: '#1e2530',
      textSecondary: '#5a6577',
      accent: '#4a5f8a',
      accentHover: '#3a4f7a',
      linkVisited: '#6a7a9a',
      border: '#d5dae3',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      bg: '#f7f8f5',
      bgSecondary: '#edf0e8',
      text: '#2a2d26',
      textSecondary: '#5f6558',
      accent: '#5a7a4a',
      accentHover: '#4a6a3a',
      linkVisited: '#6a8a5a',
      border: '#d5ddc8',
    },
  },
  {
    id: 'plum',
    name: 'Plum',
    colors: {
      bg: '#faf8fa',
      bgSecondary: '#f0ecf0',
      text: '#2a262d',
      textSecondary: '#6b5f6b',
      accent: '#7a4a6a',
      accentHover: '#6a3a5a',
      linkVisited: '#8a6a7a',
      border: '#ddd5dd',
    },
  },
];

export const defaultTheme = themes[0];

export interface FontPairing {
  id: string;
  name: string;
  serif: string;
  sans: string;
  mono: string;
  // Google Fonts URL to load dynamically
  googleFontsUrl: string;
}

export const fontPairings: FontPairing[] = [
  {
    id: 'literata-plex',
    name: 'Literata + IBM Plex Sans',
    serif: '"Literata", Georgia, serif',
    sans: '"IBM Plex Sans", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Literata:wght@400;700&family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono&display=swap',
  },
  {
    id: 'newsreader-general',
    name: 'Newsreader + General Sans',
    serif: '"Newsreader", Georgia, serif',
    sans: '"General Sans", -apple-system, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Newsreader:wght@400;700&family=JetBrains+Mono&display=swap',
  },
  {
    id: 'fraunces-switzer',
    name: 'Fraunces + Switzer',
    serif: '"Fraunces", Georgia, serif',
    sans: '"Switzer", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=IBM+Plex+Mono&display=swap',
  },
  {
    id: 'source-serif-inter',
    name: 'Source Serif + Inter',
    serif: '"Source Serif 4", Georgia, serif',
    sans: '"Inter", -apple-system, sans-serif',
    mono: '"Source Code Pro", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&family=Inter:wght@400;500;700&family=Source+Code+Pro&display=swap',
  },
  {
    id: 'crimson-work',
    name: 'Crimson Pro + Work Sans',
    serif: '"Crimson Pro", Georgia, serif',
    sans: '"Work Sans", -apple-system, sans-serif',
    mono: '"Fira Code", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&family=Work+Sans:wght@400;500;700&family=Fira+Code&display=swap',
  },
  {
    id: 'lora-karla',
    name: 'Lora + Karla',
    serif: '"Lora", Georgia, serif',
    sans: '"Karla", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", monospace',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Karla:wght@400;500;700&family=IBM+Plex+Mono&display=swap',
  },
];

export const defaultFontPairing = fontPairings[0];

export function getStoredFontId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('blog-font');
}

export function storeFontId(id: string): void {
  localStorage.setItem('blog-font', id);
}

export function applyFontPairing(pairing: FontPairing): void {
  const root = document.documentElement;
  root.style.setProperty('--font-serif', pairing.serif);
  root.style.setProperty('--font-sans', pairing.sans);
  root.style.setProperty('--font-mono', pairing.mono);

  // Load fonts dynamically
  const existingLink = document.getElementById('dev-font-link');
  if (existingLink) existingLink.remove();

  const link = document.createElement('link');
  link.id = 'dev-font-link';
  link.rel = 'stylesheet';
  link.href = pairing.googleFontsUrl;
  document.head.appendChild(link);
}

export function getStoredThemeId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('blog-theme');
}

export function storeThemeId(id: string): void {
  localStorage.setItem('blog-theme', id);
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.colors.bg);
  root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
  root.style.setProperty('--text', theme.colors.text);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--accent-hover', theme.colors.accentHover);
  root.style.setProperty('--link-visited', theme.colors.linkVisited);
  root.style.setProperty('--border', theme.colors.border);
}

export function applyCustomColors(colors: Partial<Theme['colors']>): void {
  const root = document.documentElement;
  if (colors.bg) root.style.setProperty('--bg', colors.bg);
  if (colors.bgSecondary) root.style.setProperty('--bg-secondary', colors.bgSecondary);
  if (colors.text) root.style.setProperty('--text', colors.text);
  if (colors.textSecondary) root.style.setProperty('--text-secondary', colors.textSecondary);
  if (colors.accent) root.style.setProperty('--accent', colors.accent);
  if (colors.accentHover) root.style.setProperty('--accent-hover', colors.accentHover);
  if (colors.linkVisited) root.style.setProperty('--link-visited', colors.linkVisited);
  if (colors.border) root.style.setProperty('--border', colors.border);
}
