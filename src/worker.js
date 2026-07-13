import { handleApi } from './api/index'
import { handleUpload } from './upload'
import { getRouteData } from './seo-route-data'

const AI_BOT_PATTERNS = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Googlebot', 'Google-Extended',
  'Bytespider', 'Amazonbot',
  'Applebot', 'Meta-ExternalAgent',
  'anthropic-ai', 'cohere-ai',
  'facebookexperimentalbot',
]

function addSecurityHeaders(headers) {
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  headers.set('X-XSS-Protection', '0')
  if (!headers.has('Content-Security-Policy')) {
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; font-src 'self' https://fonts.gstatic.com https://api.fontshare.com; img-src 'self' data: https://images.unsplash.com https://picsum.photos; connect-src 'self' https://plausible.io; frame-src 'none'; object-src 'none'")
  }
}

function isAIBot(userAgent) {
  if (!userAgent) return false
  return AI_BOT_PATTERNS.some(p => userAgent.toLowerCase().includes(p.toLowerCase()))
}

class SeoHandler {
  constructor(routeData, isBot) {
    this.routeData = routeData
    this.isBot = isBot
    this.titleDone = false
    this.descDone = false
    this.ogTitleDone = false
    this.ogDescDone = false
    this.twTitleDone = false
    this.twDescDone = false
    this.canonicalDone = false
    this.schemaDone = false
    this.rootDone = false
  }

  element(element) {
    const tag = element.tagName
    if (!tag) return

    if (tag === 'title' && !this.titleDone) {
      element.setInnerContent(this.routeData.title)
      this.titleDone = true
      return
    }

    if (tag === 'meta') {
      const name = element.getAttribute('name') || ''
      const property = element.getAttribute('property') || ''

      if (name === 'description' && !this.descDone) {
        element.setAttribute('content', this.routeData.description)
        this.descDone = true
        return
      }
      if (property === 'og:title' && !this.ogTitleDone) {
        element.setAttribute('content', this.routeData.title)
        this.ogTitleDone = true
        return
      }
      if (property === 'og:description' && !this.ogDescDone) {
        element.setAttribute('content', this.routeData.description)
        this.ogDescDone = true
        return
      }
      if (name === 'twitter:title' && !this.twTitleDone) {
        element.setAttribute('content', this.routeData.title)
        this.twTitleDone = true
        return
      }
      if (name === 'twitter:description' && !this.twDescDone) {
        element.setAttribute('content', this.routeData.description)
        this.twDescDone = true
        return
      }
      return
    }

    if (tag === 'link' && !this.canonicalDone) {
      if (element.getAttribute('rel') === 'canonical') {
        element.setAttribute('href', this.routeData.canonical)
        this.canonicalDone = true
      }
      return
    }

    if (tag === 'script') {
      if (element.getAttribute('type') === 'application/ld+json' && !this.schemaDone) {
        const graph = this.routeData.schema
        if (graph && graph.length > 0) {
          element.setInnerContent(JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': graph,
          }, null, 2))
        }
        this.schemaDone = true
        return
      }
    }

    if (tag === 'div' && !this.rootDone) {
      const id = element.getAttribute('id')
      if (id === 'root' && this.isBot && this.routeData.rootContent) {
        element.setInnerContent(this.routeData.rootContent, { html: true })
        this.rootDone = true
      }
    }
  }
}

async function handleAssets(request, env) {
  const url = new URL(request.url)
  const path = url.pathname

  const staticExtensions = /\.(js|css|json|xml|txt|svg|ico|png|jpg|jpeg|gif|webp|woff2?|ttf|otf|eot|wasm|mp4|webm)$/i
  if (staticExtensions.test(path)) {
    const res = await env.ASSETS.fetch(request)
    const headers = new Headers(res.headers)
    addSecurityHeaders(headers)
    const isImmutable = /\.(js|css|woff2?|ttf|otf|eot)$/i.test(path)
    if (isImmutable) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(path)) {
      headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
    } else {
      headers.set('Cache-Control', 'public, max-age=3600')
    }
    return new Response(res.body, { status: res.status, headers })
  }

  const userAgent = request.headers.get('User-Agent') || ''
  const isBot = isAIBot(userAgent)
  const routeData = getRouteData(url)

  let response
  if (path === '/' || path === '/index.html') {
    response = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))
  } else {
    const assetRes = await env.ASSETS.fetch(request)
    if (assetRes.status === 404) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))
    } else {
      response = assetRes
    }
  }

  if (!routeData) {
    const headers = new Headers(response.headers)
    addSecurityHeaders(headers)
    return new Response(response.body, { status: response.status, headers })
  }

  const seoHandler = new SeoHandler(routeData, isBot)

  const transformed = new HTMLRewriter()
    .on('title', seoHandler)
    .on('meta', seoHandler)
    .on('link[rel="canonical"]', seoHandler)
    .on('script[type="application/ld+json"]', seoHandler)
    .on('div#root', seoHandler)
    .transform(response)

  const headers = new Headers(transformed.headers)
  addSecurityHeaders(headers)
  return new Response(transformed.body, { status: transformed.status, headers })
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/upload') && request.method === 'POST') {
      return handleUpload(request, env)
    }

    if (url.pathname.startsWith('/api/') || url.pathname === '/health') {
      return handleApi(request, env, ctx)
    }

    return handleAssets(request, env)
  },
}
