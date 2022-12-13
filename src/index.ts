export interface Env {}

// @ts-ignore
import home from './home.html'

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/') {
      return new Response(home, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
        },
      })
    }
    return new Response(null, { status: 404 })
  },
}
