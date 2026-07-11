import { handleApi } from './api/index'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // Route API requests to the API handler
    if (url.pathname.startsWith('/api/') || url.pathname === '/health') {
      return handleApi(request, env)
    }

    // Serve static assets (Vite build output)
    // If the asset isn't found, serve index.html (SPA fallback)
    const response = await env.ASSETS.fetch(request)
    if (response.status === 404) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request))
    }
    return response
  },
}
