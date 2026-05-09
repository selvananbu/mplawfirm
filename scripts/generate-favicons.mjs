#!/usr/bin/env node
/**
 * Raster favicons derived from `public/logo-transparent.png` so the browser tab matches Navbar/Footer.
 */
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'public')
const src = join(root, 'logo-transparent.png')

async function raster(name, size) {
  const out = join(root, name)
  await sharp(src)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(out)
}

async function main() {
  if (!existsSync(src)) {
    console.error('[generate-favicons] Missing', src)
    process.exit(1)
  }

  await Promise.all([
    raster('favicon-32.png', 32),
    raster('favicon-48.png', 48),
    raster('apple-touch-icon.png', 180),
  ])
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
