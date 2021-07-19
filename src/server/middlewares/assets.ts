import path from 'path'
import Koa from 'koa'
import mount from 'koa-mount'
import proxy from 'koa-server-http-proxy'
import koaStatic from 'koa-static'

export const configureAssets = (app: Koa) => {
  const rootDir = path.resolve(__dirname, '../../..')

  app.use(
    mount(
      '/',
      koaStatic(path.resolve(rootDir, 'assets/public'), {
        maxage: 1000 * 86400 * 365,
        brotli: true,
        gzip: true,
      }),
    ),
  )

  app.use(
    mount(
      '/assets-next',
      koaStatic(path.resolve(rootDir, 'assets'), {
        maxage: 1000 * 86400 * 365,
        brotli: true,
        gzip: true,
      }),
    ),
  )

  if (process.env.NODE_ENV === 'production') {
    app.use(
      mount(
        '/static',
        koaStatic(path.resolve(rootDir, 'build/static'), {
          maxage: 1000 * 86400 * 365,
          brotli: true,
          gzip: true,
        }),
      ),
    )
  } else {
    app.use(
      proxy('/static', {
        target: 'http://localhost:8031',
      }),
    )
    app.use(
      proxy('/sockjs-node', {
        target: 'http://localhost:8031',
        ws: true,
      }),
    )
  }
}
