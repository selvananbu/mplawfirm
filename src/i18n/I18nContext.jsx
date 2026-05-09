import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './context.js';
import { en } from './locales/en';
import { ta } from './locales/ta';
import { getByPath, interpolate } from './utils';

const STORAGE_KEY = 'mplang';

const DICTS = { en, ta };

function resolveRaw(locale, path) {
  let v = getByPath(DICTS[locale], path);
  if (v === undefined && locale !== 'en') {
    v = getByPath(DICTS.en, path);
  }
  return v;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const s = localStorage.getItem(STORAGE_KEY);
    return s === 'ta' ? 'ta' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = locale === 'ta' ? 'ta' : 'en';
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    setLocaleState(next === 'ta' ? 'ta' : 'en');
  }, []);

  const t = useCallback(
    (path, vars) => {
      const raw = resolveRaw(locale, path);
      if (typeof raw !== 'string') return '';
      return interpolate(raw, vars ?? {});
    },
    [locale]
  );

  const taPath = useCallback(
    (path) => {
      const raw = resolveRaw(locale, path);
      return Array.isArray(raw) ? raw : [];
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, ta: taPath }),
    [locale, setLocale, t, taPath]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
