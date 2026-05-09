#!/usr/bin/env node
/**
 * Fails if any secret env file is tracked by git (except .env.example).
 * Run before deploy: npm run deploy:check
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
if (!existsSync(join(root, '.git'))) {
  process.exit(0);
}

let tracked;
try {
  tracked = execSync('git ls-files', { encoding: 'utf8', cwd: root })
    .split(/\r?\n/)
    .filter(Boolean);
} catch {
  process.exit(0);
}

const bad = tracked.filter((f) => {
  const base = f.split('/').pop();
  if (base === '.env.example') return false;
  if (base === '.env') return true;
  if (base.startsWith('.env.')) return true;
  return false;
});

if (bad.length > 0) {
  console.error(
    '\n[deploy:check] These env files are tracked by git — remove from index and add real values only in Netlify:\n',
    bad.join('\n'),
    '\n',
  );
  process.exit(1);
}

process.exit(0);
