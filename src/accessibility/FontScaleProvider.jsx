import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { FontScaleContext } from './fontScaleContext.js';

const STORAGE_KEY = 'mp-font-scale';

function readStoredScale() {
  if (typeof window === 'undefined') return 0;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === '1') return 1;
  if (v === '2') return 2;
  return 0;
}

export function FontScaleProvider({ children }) {
  const [scale, setScaleState] = useState(() => readStoredScale());

  const setScale = useCallback((next) => {
    const n = next === 2 ? 2 : next === 1 ? 1 : 0;
    setScaleState(n);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (scale === 0) {
      root.removeAttribute('data-font-scale');
    } else {
      root.setAttribute('data-font-scale', String(scale));
    }
    localStorage.setItem(STORAGE_KEY, String(scale));
  }, [scale]);

  const value = useMemo(() => ({ scale, setScale }), [scale, setScale]);

  return <FontScaleContext.Provider value={value}>{children}</FontScaleContext.Provider>;
}
