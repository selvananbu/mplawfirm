import { FIRM_NAME } from '../constants/branding';
import { OFFICE_CITY } from '../constants/contact';
import { interpolate } from './utils';

function initialsFromName(name) {
  const s = String(name).trim();
  if (!s) return '?';
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] || '';
    const b = parts[1][0] || '';
    return (a + b).toUpperCase();
  }
  return s.slice(0, 2).toUpperCase();
}

/** @param {Array<{ name: string; role: string; text: string; badge: string; initials?: string }>} rows */
export function mapFallbackRows(rows) {
  if (!Array.isArray(rows)) return [];
  const vars = { city: OFFICE_CITY, firm: FIRM_NAME };
  return rows.map((row, i) => ({
    id: `fallback-${i + 1}`,
    name: row.name,
    role: interpolate(row.role, vars),
    text: interpolate(row.text, vars),
    initials: row.initials ?? initialsFromName(row.name),
    rating: 5,
    badge: row.badge,
    source: 'fallback',
  }));
}
