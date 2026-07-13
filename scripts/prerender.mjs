import { preview } from 'vite'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

async function prerender() {
  console.log('Starting preview server...')

  const server = await preview({
    root: join(__dirname, '..'),
    preview: { port: 5199 },
    logLevel: 'silent',
  })
  server.printUrls()

  const address = server.httpServer.address()
  const baseUrl = `http://localhost:${address.port}`
  const results = []

  const urls = [
    { path: '/', file: 'index.html' },
    { path: '/?page=blog', file: 'prerender-blog.html' },
    { path: '/?page=sales-pricing', file: 'prerender-pricing.html' },
    { path: '/?page=about', file: 'prerender-about.html' },
    { path: '/?page=privacy', file: 'prerender-privacy.html' },
    { path: '/?page=terms', file: 'prerender-terms.html' },
  ]

  for (const route of urls) {
    try {
      const resp = await fetch(`${baseUrl}${route.path}`)
      const html = await resp.text()
      writeFileSync(join(DIST, route.file), html)
      const size = (html.length / 1024).toFixed(1)
      console.log(`  ✓ ${route.path} → ${route.file} (${size} KB)`)
      results.push({ ...route, success: true, size })
    } catch (err) {
      console.log(`  ✗ ${route.path} — ${err.message}`)
      results.push({ ...route, success: false })
    }
  }

  server.httpServer.close()

  const ok = results.filter(r => r.success).length
  console.log(`\nPrerendered ${ok}/${urls.length} pages`)
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
