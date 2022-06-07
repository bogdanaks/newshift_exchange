import { Context } from 'koa'

import Logger from 'utils/logger'
import { responseOk, responseError } from 'utils/response'

import Service from './currencies.service'

import errorBuilder from 'utils/error-builder'

class Controller {
  readonly logger: Logger
  readonly service: Service
  constructor(logger: Logger, service: Service) {
    this.logger = logger
    this.service = service
  }

  async getCurrencies(ctx: Context): Promise<Context> {
    try {
      const currencies = await this.service.getCurrencies()
      return responseOk(ctx, currencies)
    } catch (err) {
      return responseError(ctx, errorBuilder.buildNotFoundError())
    }
  }
}

export default Controller
