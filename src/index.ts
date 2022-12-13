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

function handleBadRequest() {
  return new Response(null, { status: 400 })
}

async function handleVisit(searchParams: URLSearchParams, env: Env) {
  const page = searchParams.get('page')
  if (!page) {
    return handleBadRequest()
  }
  const kvPage = await env.DB.get(page)
  let value = 1
  if (!kvPage) {
    await env.DB.put(page, value + '')
  } else {
    value = parseInt(kvPage) + 1
    await env.DB.put(page, value + '')
  }
  return new Response(JSON.stringify({ visits: value }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
      case '/visit':
        return handleVisit(searchParams, env)
      default:
        return handleNotFound()
    }
  },
}
