#!/usr/bin/env node
/**
 * Generate favicon files from the apex logo
 */
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const source = join(root, 'assets/source/apex.jpg')
const publicDir = join(root, 'public')

async function generateFavicons() {
  console.log('📸 Generating favicons from apex.jpg...')
  
  const logoBuffer = await readFile(source)
  
  // Generate PNG favicon (32x32)
  await sharp(logoBuffer)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'favicon.png'))
  console.log('✓ favicon.png (32x32)')
  
  // Generate Apple Touch Icon (180x180)
  await sharp(logoBuffer)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('✓ apple-touch-icon.png (180x180)')
  
  // Generate SVG favicon (simple circle with the logo)
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circle">
      <circle cx="50" cy="50" r="50"/>
    </clipPath>
  </defs>
  <image href="/apex.jpg" width="100" height="100" clip-path="url(#circle)"/>
</svg>`
  
  await writeFile(join(publicDir, 'favicon.svg'), svgFavicon)
  console.log('✓ favicon.svg')
  
  console.log('✅ All favicons generated!')
}

generateFavicons().catch(console.error)
