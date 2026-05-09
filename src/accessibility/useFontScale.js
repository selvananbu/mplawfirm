import { useContext } from 'react';
import { FontScaleContext } from './fontScaleContext.js';

export function useFontScale() {
  const ctx = useContext(FontScaleContext);
  if (!ctx) {
    throw new Error('useFontScale must be used within FontScaleProvider');
  }
  return ctx;
}
