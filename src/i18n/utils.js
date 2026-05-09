export function getByPath(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let acc = obj;
  for (const part of parts) {
    if (acc == null) return undefined;
    if (Array.isArray(acc) && /^\d+$/.test(part)) {
      acc = acc[Number(part)];
    } else {
      acc = acc[part];
    }
  }
  return acc;
}

export function interpolate(str, vars) {
  if (typeof str !== 'string' || !vars) return str;
  let out = str;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(String(v));
  }
  return out;
}
