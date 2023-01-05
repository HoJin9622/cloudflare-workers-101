export interface Env {
  DB: KVNamespace
}

// @ts-ignore
import home from './home.html'

function handleHome() {
  return new Response(home, {
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
    },
  })
}

function handleNotFound() {
  return new Response(null, { status: 404 })
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname, searchParams } = new URL(request.url)
    switch (pathname) {
      case '/':
        return handleHome()
      default:
        return handleNotFound()
    }
  },
}
