/**
 * Stock photo pipeline: converts the free-licence photos in assets/source/stock/ into responsive
 * WebP files in public/images/stock/. Re-run after adding or swapping a stock photo:
 *
 *   npm run images:stock
 *
 * Sources and licences for every photo are listed in assets/source/stock/CREDITS.md.
 * Reference them in src/config/site.ts with `stock('<name>', alt)`.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = path.join(root, 'assets/source/stock')
const out = path.join(root, 'public/images/stock')

// Same widths as the job photos (WORK_WIDTHS in src/config/site.ts), so <Photo> works unchanged.
const WIDTHS = [480, 800, 1200]
await mkdir(out, { recursive: true })
const files = (await readdir(src)).filter((f) => /\.jpe?g$/i.test(f))
for (const file of files) {
  const name = file.replace(/\.jpe?g$/i, '')
  for (const width of WIDTHS) {
    await sharp(path.join(src, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(out, `${name}-${width}.webp`))
  }
  console.log(`✓ stock/${name}`)
}
