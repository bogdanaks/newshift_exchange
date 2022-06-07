import { Context } from 'koa'

import Logger from 'utils/logger'
import { responseOk, responseError } from 'utils/response'
import errorBuilder from 'utils/error-builder'

import Service from './minimal.service'

class Controller {
  readonly logger: Logger
  readonly service: Service
  constructor(logger: Logger, service: Service) {
    this.logger = logger
    this.service = service
  }

  async getMinimalFromTo(ctx: Context): Promise<Context> {
    try {
      const { from, to } = ctx.query
      const minimal = await this.service.getMinimalFromTo({ from: String(from).toLowerCase(), to: String(to).toLowerCase() })
      return responseOk(ctx, minimal)
    } catch (err) {
      return responseError(ctx, errorBuilder.buildNotFoundError())
    }
  }
}

export default Controller
