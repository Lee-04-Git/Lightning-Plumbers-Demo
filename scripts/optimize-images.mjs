/**
 * Image pipeline: converts originals in assets/source/ into responsive WebP
 * files in public/images/. Re-run after adding or swapping photos:
 *
 *   npm run images
 *
 * Job photos: drop JPEGs into assets/source/work/ (e.g. solar-maitland-01.jpg)
 * and reference them in src/config/site.ts as '/images/work/<name>'.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = (f) => path.join(root, 'assets/source', f)
const out = (f) => path.join(root, 'public/images', f)

// The business's own job photos (from their public Facebook page), mostly 1200×1600 portrait.
const WORK_WIDTHS = [480, 800, 1200]
await mkdir(out('work'), { recursive: true })
const workFiles = (await readdir(src('work'))).filter((f) => /\.jpe?g$/i.test(f))
for (const file of workFiles) {
  const name = file.replace(/\.jpe?g$/i, '')
  for (const width of WORK_WIDTHS) {
    await sharp(src(`work/${file}`))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(out(`work/${name}-${width}.webp`))
  }
  console.log(`✓ work/${name}`)
}

// Page banners: a wide 16:7 crop for the top of each page. To use your own artwork (e.g. an
// AI-generated image), save it as assets/source/banners/<page>.jpg (or .png/.webp) and re-run;
// otherwise the job photo listed here is used. `top` is where the crop sits (0 = top, 1 = bottom).
const BANNERS = {
  home: { photo: 'solar-maitland-01', top: 0.02 },
  about: { photo: 'jojo-tanks-01', top: 0.2 },
  services: { photo: 'solar-diepriver-02', top: 0.42 },
  showcase: { photo: 'bathroom-clawfoot-01', top: 0.5 },
  contact: { photo: 'solar-surrey-01', top: 0.08 },
}
await mkdir(out('banners'), { recursive: true })
const custom = await readdir(src('banners')).catch(() => [])
for (const [key, { photo, top }] of Object.entries(BANNERS)) {
  const own = custom.find((f) => f.replace(/\.(jpe?g|png|webp)$/i, '') === key)
  const input = own ? src(`banners/${own}`) : src(`work/${photo}.jpg`)
  const img = sharp(input).rotate()
  const { width, height } = await img.metadata()
  const cropH = Math.min(height, Math.round((width * 7) / 16))
  const cropW = Math.min(width, Math.round((cropH * 16) / 7))
  const crop = {
    left: Math.round((width - cropW) / 2),
    top: Math.round((height - cropH) * (own ? 0.5 : top)),
    width: cropW,
    height: cropH,
  }
  for (const w of [960, 1600]) {
    await sharp(input)
      .rotate()
      .extract(crop)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(out(`banners/${key}-${w}.webp`))
  }
  console.log(`✓ banners/${key}${own ? ' (custom image)' : ''}`)
}

// Logo: navy artwork on white → transparent mark, tinted navy and white.
async function logo(color, name) {
  const base = sharp(src('logo-facebook.jpg')).trim({ threshold: 30 }).resize(512, 512, {
    fit: 'contain',
    background: '#ffffff',
  })
  const alpha = await base.clone().greyscale().negate().linear(1.35, -18).raw().toBuffer({ resolveWithObject: true })
  const { width, height } = alpha.info
  await sharp({ create: { width, height, channels: 3, background: color } })
    .joinChannel(alpha.data, { raw: { width, height, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(out(name))
  console.log(`✓ ${name}`)
}
await logo('#14305a', 'logo-navy.png')
await logo('#ffffff', 'logo-white.png')

for (const [size, name] of [
  [64, 'favicon.png'],
  [180, 'apple-touch-icon.png'],
]) {
  await sharp(src('logo-facebook.jpg'))
    .trim({ threshold: 30 })
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(path.join(root, 'public', name))
  console.log(`✓ ${name}`)
}

// Social share image (1200×630) from the Maitland solar install.
await sharp(src('work/solar-maitland-01.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 80 })
  .toFile(out('og-image.jpg'))
console.log('✓ og-image.jpg')
