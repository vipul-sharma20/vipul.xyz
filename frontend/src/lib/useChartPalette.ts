'use client';

import { useEffect, useState } from 'react';
import {
  type ChartPalette,
  defaultChartPalette,
  findPalette,
  getStoredPaletteId,
  CHART_PALETTE_EVENT,
} from './chartPalettes';

export function useChartPalette(): ChartPalette {
  const [palette, setPalette] = useState<ChartPalette>(defaultChartPalette);
  useEffect(() => {
    setPalette(findPalette(getStoredPaletteId()));
    function onChange(e: Event) {
      setPalette(findPalette((e as CustomEvent<string>).detail));
    }
    window.addEventListener(CHART_PALETTE_EVENT, onChange);
    return () => window.removeEventListener(CHART_PALETTE_EVENT, onChange);
  }, []);
  return palette;
}
