import Router from '@koa/router'
import Logger from 'utils/logger'

import CurrenciesController from './currencies.controller'
import CurrenciesService from './currencies.service'

export const router = new Router()

const logger = new Logger('CURRENCIES')
const service = new CurrenciesService()
const controller = new CurrenciesController(logger, service)

router.get('/currencies',
  (ctx) => controller.getCurrencies(ctx)
)
