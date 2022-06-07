import Router from '@koa/router'

import { router as currenciesRouter } from './currencies/currencies.router'
import { router as estimatesRouter } from './estimate/estimate.router'
import { router as minimalRouter } from './minimal/minimal.router'

const router = new Router({ prefix: '/api/v1' })

router.use(currenciesRouter.middleware())
router.use(estimatesRouter.middleware())
router.use(minimalRouter.middleware())

router.all('(.*)', (ctx) => {
  ctx.body = {
    status: false,
    statusCode: 404,
    message: 'Endpoint not found',
  }
  ctx.status = 404
  return ctx
})

export default router
