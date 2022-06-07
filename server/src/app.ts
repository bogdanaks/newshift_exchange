import 'reflect-metadata'
import Koa, { Context, Next } from 'koa'
import Logger from 'koa-logger'
import Cors from '@koa/cors'
import Helmet from 'koa-helmet'
import respond from 'koa-respond'
import BodyParser from 'koa-bodyparser'
import compress from 'koa-compress'

import { connection } from 'models/index'
import CurrenciesJob from 'jobs/currencies.job'

import routerV1 from './routers/v1'
import errorBuilder, { CustomError } from './utils/error-builder'
import CustomLogger from './utils/logger'
import { asyncStorage } from './utils/async-storage'

const logger = new CustomLogger('APP')

process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw reason
})

process.on('uncaughtException', (error) => {
  logger.error('uncaughtException occured', error)
})

const app = new Koa()

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'master-id'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
}))

app.use(compress({
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  br: false,
}))

app.use(BodyParser({
  // eslint-disable-next-line no-unused-vars,node/handle-callback-err
  onerror(err, ctx) {
  },
}))

app.use(async (ctx, next) => {
  await asyncStorage.run(new Map(), async () => {
    logger.setLogId()
    await next()
  })
})

async function handleError (error: CustomError, ctx: Context): Promise<void> {
  const internalError = errorBuilder.buildInternalServerError()

  ctx.status = error.statusCode || internalError.statusCode
  ctx.body = {
    status: false,
    statusCode: error.statusCode || internalError.statusCode,
    code: error.code || internalError.code,
    message: error.message,
  }
}

app.use(async (ctx: Context, next: Next) => {
  try {
    return await next()
  } catch (error) {
    logger.error(error)

    let err = error
    if (!(error instanceof CustomError)) {
      err = errorBuilder.buildInternalServerError()
    }
    await handleError(err, ctx)
  }
})

;(async () => {
  await connection.connect()
  await CurrenciesJob.init() // run jobs
})()

// API V1 routes
app.use(respond())
app.use(routerV1.routes())
app.use(routerV1.allowedMethods())

export default app
