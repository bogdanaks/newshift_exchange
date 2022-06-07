import { Context } from 'koa'

import Logger from 'utils/logger'
import { responseOk, responseError } from 'utils/response'

import Service from './estimate.service'

import errorBuilder from 'utils/error-builder'

class Controller {
  readonly logger: Logger
  readonly service: Service
  constructor(logger: Logger, service: Service) {
    this.logger = logger
    this.service = service
  }

  async getEstimateFromTo(ctx: Context): Promise<Context> {
    try {
      const { from, to, amount } = ctx.query
      const estimate = await this.service.getEstimateFromTo({ from: String(from), to: String(to), amount: String(amount) })
      return responseOk(ctx, estimate)
    } catch (err) {
      return responseError(ctx, errorBuilder.buildNotFoundError())
    }
  }
}

export default Controller
