import 'source-map-support/register'

import { createKoaServer } from '@hedviginsurance/web-survival-kit'
import * as Sentry from '@sentry/node'
import { IHelmetConfiguration } from 'helmet'
import * as bodyParser from 'koa-bodyparser'
import * as convert from 'koa-convert'
import * as proxy from 'koa-proxy'
import * as removeTrailingSlashes from 'koa-remove-trailing-slashes'
import { Logger } from 'typescript-logging'
import { oldAssetRoutes, routes, tmpOldRoutes } from '../routes'
import { config } from './config'
import { helmetConfig } from './config/helmetConfig'
import { sentryConfig } from './config/sentry'
import { appLogger } from './logging'
import { inCaseOfEmergency } from './middlewares/enhancers'
import { forceHost } from './middlewares/redirects'
import { getPageMiddleware } from './page'

Sentry.init({
  ...sentryConfig(),
  serverName: process.env.HEROKU_DYNO_ID,
  attachStacktrace: true,
})

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8030)

appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Sentry is ${
    Boolean(sentryConfig().enabled) ? 'enabled' : 'disabled'
  }, with environment "${sentryConfig().environment}"`,
)

if (!config.storyblokApiToken) {
  appLogger.fatal('No api token for storyblok provided!')
  process.nextTick(() => process.exit(1))
}

let authConfig: { name: string; pass: string } | undefined
if (process.env.USE_AUTH) {
  appLogger.info(
    `Protecting server using basic auth with user ${process.env.AUTH_NAME} 💂‍`,
  )
  authConfig = {
    name: process.env.AUTH_NAME!,
    pass: process.env.AUTH_PASS!,
  }
} else {
  appLogger.info('Not using any auth, server is open to the public')
}
let helmetConfigToUse: IHelmetConfiguration | undefined
if (process.env.USE_HELMET) {
  appLogger.info('Using helmet and strict CSP ⛑')
  helmetConfigToUse = helmetConfig()
} else if (process.env.NODE_ENV !== 'development') {
  appLogger.warn(
    'NOT using any helmet or CSP headers. This is not recommended for production usage',
  )
}

const server = createKoaServer({
  publicPath: '/assets-next',
  assetLocation: __dirname + '/assets',
  helmetConfig: helmetConfigToUse,
  authConfig,
})

if (config.forceHost) {
  server.router.use(forceHost({ host: config.forceHost }))
}
server.router.use('/*', removeTrailingSlashes())
server.router.use(
  bodyParser({
    extendTypes: { json: ['application/csp-report'] },
  }),
)

server.app.use(inCaseOfEmergency)
server.router.use(inCaseOfEmergency)

server.router.get('/panic-room', async () => {
  throw new Error(
    'Entered the panic room, this is an expected error. Carry on 👜',
  )
})

server.router.post('/_report-csp-violation', (ctx) => {
  ;(ctx.state.getLogger('cspViolation') as Logger).error(
    `CSP VIOLATION: ${JSON.stringify(ctx.request.body)}`,
  )
  ctx.status = 204
})

const oldSiteProxy = convert(
  proxy({
    host: 'https://hedvig.netlify.com',
  }),
)

server.router.use(oldAssetRoutes, oldSiteProxy)
server.router.get(routes.map(({ path }) => path), getPageMiddleware)
server.router.use(tmpOldRoutes, oldSiteProxy)

server.app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})
