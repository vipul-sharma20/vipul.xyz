'use client';

import { useEffect } from 'react';
import {
  themes, defaultTheme, getStoredThemeId, applyTheme,
  fontPairings, defaultFontPairing, getStoredFontId, applyFontPairing,
} from '@/lib/themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedThemeId = getStoredThemeId();
    if (storedThemeId) {
      const theme = themes.find(t => t.id === storedThemeId) || defaultTheme;
      applyTheme(theme);
    }
    const storedFontId = getStoredFontId();
    if (storedFontId) {
      const pairing = fontPairings.find(f => f.id === storedFontId) || defaultFontPairing;
      applyFontPairing(pairing);
    }
  }, []);

  return <>{children}</>;
}
