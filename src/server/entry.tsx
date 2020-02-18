import 'source-map-support/register'

import { createKoaServer } from '@hedviginsurance/web-survival-kit'
import * as Sentry from '@sentry/node'
import { IHelmetConfiguration } from 'helmet'
import { Middleware } from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as proxy from 'koa-proxy'
import * as removeTrailingSlashes from 'koa-remove-trailing-slashes'
import { Logger } from 'typescript-logging'
import { redirects, routes } from '../routes'
import { config } from './config'
import { helmetConfig } from './config/helmetConfig'
import { sentryConfig } from './config/sentry'
import { appLogger } from './logging'
import {
  inCaseOfEmergency,
  savePartnershipCookie,
} from './middlewares/enhancers'
import { forceHost } from './middlewares/redirects'
import {
  addBlogPostsToState,
  addTagBlogPostsToState,
  addTeamtailorUsersToState,
  State,
} from './middlewares/states'
import { getPageMiddleware } from './page'
import { sitemapXml } from './sitemap'
import { nukeCache } from './utils/storyblok'
import {
  getCachedTeamtailorUsers,
  initializeTeamtailorUsers,
} from './utils/teamtailor'

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
  server.router.use('/*', forceHost({ host: config.forceHost }))
}
server.router.use('/*', savePartnershipCookie)
server.router.use('/*', removeTrailingSlashes<State>())
redirects.forEach(([source, target, code]) => {
  server.router.get(source, (ctx) => {
    ctx.status = code
    ctx.redirect(target)
  })
})
server.router.use(
  proxy({
    host: 'https://a.storyblok.com',
    match: /^\/f\//,
  }),
)
server.router.use(
  '/*',
  bodyParser({
    extendTypes: { json: ['application/csp-report'] },
  }) as Middleware<State, any>,
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
    `CSP VIOLATION: ${JSON.stringify((ctx.request as any).body)}`,
  )
  ctx.status = 204
})

server.router.get('/sitemap.xml', sitemapXml)
server.router.use('/blog', addBlogPostsToState)
server.router.use('/blog', addTeamtailorUsersToState)
server.router.use('/about-us', addTeamtailorUsersToState)
server.router.use('/en/about-us', addTeamtailorUsersToState)
server.router.use('/blog/tags/:tag', addTagBlogPostsToState)
routes.forEach((route) => {
  server.router.get(
    route.path,
    getPageMiddleware(Boolean(route.ignoreStoryblokMiss)),
  )
})
server.router.post('/_nuke-cache', nukeCache)

getCachedTeamtailorUsers()
  .then(async (users) => {
    if (users.length === 0) {
      appLogger.info(
        'No teamtailor users found in cache, waiting for initialization to complete before starting server',
      )
      return initializeTeamtailorUsers() // wait for promise to complete before continuing
    } else {
      appLogger.info(
        'Teamtailor users found in cache, starting server while refreshing cache',
      )
      initializeTeamtailorUsers() // ignore promise since we want to start even if we're timing out TT users
      return users
    }
  })
  .catch(() => {
    appLogger.error('Failed to fetch teamtailor users, ignoring')
  })
  .then(() => {
    server.app.listen(getPort(), () => {
      appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
    })
  })
