'use client';

import { useState, useEffect, useRef } from 'react';
import {
  themes, type Theme, applyTheme, storeThemeId, getStoredThemeId, defaultTheme,
  fontPairings, type FontPairing, applyFontPairing, storeFontId, getStoredFontId, defaultFontPairing,
} from '@/lib/themes';
import {
  chartPalettes, defaultChartPalette, getStoredPaletteId, storePaletteId, CHART_PALETTE_EVENT,
} from '@/lib/chartPalettes';

const isDev = process.env.NODE_ENV === 'development';

interface ColorField {
  key: keyof Theme['colors'];
  label: string;
}

const colorFields: ColorField[] = [
  { key: 'bg', label: 'Background' },
  { key: 'bgSecondary', label: 'Bg Secondary' },
  { key: 'text', label: 'Text' },
  { key: 'textSecondary', label: 'Text Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentHover', label: 'Accent Hover' },
  { key: 'linkVisited', label: 'Link Visited' },
  { key: 'border', label: 'Border' },
];

const cssVarMap: Record<keyof Theme['colors'], string> = {
  bg: '--bg',
  bgSecondary: '--bg-secondary',
  text: '--text',
  textSecondary: '--text-secondary',
  accent: '--accent',
  accentHover: '--accent-hover',
  linkVisited: '--link-visited',
  border: '--border',
};

export default function DevPanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeThemeId, setActiveThemeId] = useState<string>(defaultTheme.id);
  const [activeFontId, setActiveFontId] = useState<string>(defaultFontPairing.id);
  const [activePaletteId, setActivePaletteId] = useState<string>(defaultChartPalette.id);
  const [customColors, setCustomColors] = useState<Theme['colors']>({ ...defaultTheme.colors });
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDev) return;
    const storedThemeId = getStoredThemeId();
    if (storedThemeId) {
      const theme = themes.find(t => t.id === storedThemeId);
      if (theme) {
        setActiveThemeId(theme.id);
        setCustomColors({ ...theme.colors });
      }
    }
    const storedFontId = getStoredFontId();
    if (storedFontId) {
      setActiveFontId(storedFontId);
    }
    const storedPaletteId = getStoredPaletteId();
    if (storedPaletteId) {
      setActivePaletteId(storedPaletteId);
    }
  }, []);

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: MouseEvent) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
    function onUp() { setDragging(false); }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  if (!isDev) return null;

  function selectTheme(theme: Theme) {
    setActiveThemeId(theme.id);
    setCustomColors({ ...theme.colors });
    applyTheme(theme);
    storeThemeId(theme.id);
  }

  function selectFont(pairing: FontPairing) {
    setActiveFontId(pairing.id);
    applyFontPairing(pairing);
    storeFontId(pairing.id);
  }

  function selectPalette(id: string) {
    setActivePaletteId(id);
    storePaletteId(id);
    window.dispatchEvent(new CustomEvent(CHART_PALETTE_EVENT, { detail: id }));
  }

  function updateColor(key: keyof Theme['colors'], value: string) {
    setCustomColors(prev => ({ ...prev, [key]: value }));
    document.documentElement.style.setProperty(cssVarMap[key], value);
  }

  function handleDragStart(e: React.MouseEvent) {
    setDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }

  function exportTheme() {
    const font = fontPairings.find(f => f.id === activeFontId) || defaultFontPairing;
    const json = JSON.stringify({
      colors: customColors,
      font: { id: font.id, name: font.name, serif: font.serif, sans: font.sans, mono: font.mono },
    }, null, 2);
    navigator.clipboard.writeText(json);
    alert('Theme JSON copied to clipboard!');
  }

  const s = {
    section: { marginBottom: '12px' } as const,
    sectionTitle: { fontWeight: '600' as const, marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase' as const, color: '#888', letterSpacing: '0.03em' },
  };

  return (
    <div style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 9999, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontSize: '12px', lineHeight: '1.4', color: '#333' }}>
      {collapsed ? (
        <button onClick={() => setCollapsed(false)} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          &#x1f3a8; Theme
        </button>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', width: '290px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
          {/* Header */}
          <div onMouseDown={handleDragStart} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f5f5f5', borderBottom: '1px solid #eee', cursor: 'grab', userSelect: 'none' }}>
            <strong style={{ fontSize: '12px' }}>Theme Panel</strong>
            <button onClick={() => setCollapsed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', lineHeight: '1', color: '#999', padding: '0 2px' }}>&times;</button>
          </div>

          <div style={{ padding: '10px 12px', maxHeight: '75vh', overflowY: 'auto' }}>
            {/* Color presets */}
            <div style={s.section}>
              <div style={s.sectionTitle}>Color Presets</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {themes.map(theme => (
                  <button key={theme.id} onClick={() => selectTheme(theme)} style={{ padding: '4px 8px', border: activeThemeId === theme.id ? '2px solid #333' : '1px solid #ddd', borderRadius: '4px', background: theme.colors.bg, cursor: 'pointer', fontSize: '11px', color: theme.colors.text, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: theme.colors.accent }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Font pairings */}
            <div style={s.section}>
              <div style={s.sectionTitle}>Font Pairing</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {fontPairings.map(pairing => (
                  <button key={pairing.id} onClick={() => selectFont(pairing)} style={{ padding: '5px 8px', border: activeFontId === pairing.id ? '2px solid #333' : '1px solid #ddd', borderRadius: '4px', background: '#fff', cursor: 'pointer', fontSize: '11px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <span style={{ fontWeight: 500 }}>{pairing.name}</span>
                    <span style={{ fontSize: '10px', color: '#888' }}>
                      <span style={{ fontFamily: pairing.serif }}>Heading</span>
                      {' · '}
                      <span style={{ fontFamily: pairing.sans }}>Body text</span>
                      {' · '}
                      <span style={{ fontFamily: pairing.mono }}>code</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chart palettes (for /listening) */}
            <div style={s.section}>
              <div style={s.sectionTitle}>Chart Palette</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {chartPalettes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectPalette(p.id)}
                    style={{
                      padding: '5px 8px',
                      border: activePaletteId === p.id ? '2px solid #333' : '1px solid #ddd',
                      borderRadius: '4px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                    </span>
                    <span style={{ display: 'flex', height: '10px', borderRadius: '1px', overflow: 'hidden' }}>
                      {p.colors.map((c, i) => (
                        <span key={i} style={{ flex: 1, background: c }} />
                      ))}
                    </span>
                    <span style={{ fontSize: '10px', color: '#888' }}>{p.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color pickers */}
            <div style={s.section}>
              <div style={s.sectionTitle}>Colors</div>
              {colorFields.map(({ key, label }) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', gap: '6px' }}>
                  <input type="color" value={customColors[key]} onChange={e => updateColor(key, e.target.value)} style={{ width: '24px', height: '20px', border: '1px solid #ddd', borderRadius: '2px', cursor: 'pointer', padding: '0' }} />
                  <span style={{ flex: 1, fontSize: '11px' }}>{label}</span>
                  <input type="text" value={customColors[key]} onChange={e => updateColor(key, e.target.value)} style={{ width: '70px', fontSize: '10px', fontFamily: 'monospace', padding: '2px 4px', border: '1px solid #ddd', borderRadius: '2px' }} />
                </div>
              ))}
            </div>

            {/* Export */}
            <button onClick={exportTheme} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', background: '#f5f5f5', cursor: 'pointer', fontSize: '11px' }}>
              Copy Theme JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
