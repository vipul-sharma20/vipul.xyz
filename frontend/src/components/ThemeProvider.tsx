'use client';

import { useEffect } from 'react';

const isDev = process.env.NODE_ENV === 'development';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restoring a saved theme/font is a local design-tool convenience. Gating it
    // on the build-time isDev literal + a dynamic import means the themes /
    // fontPairings catalogs are dropped from the production bundle — prod simply
    // renders the default theme baked into globals.css.
    if (!isDev) return;
    import('@/lib/themes').then(
      ({
        themes, defaultTheme, getStoredThemeId, applyTheme,
        fontPairings, defaultFontPairing, getStoredFontId, applyFontPairing,
      }) => {
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
      },
    );
  }, []);

  return <>{children}</>;
}
