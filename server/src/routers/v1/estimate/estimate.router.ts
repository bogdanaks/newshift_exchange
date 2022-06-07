import Router from '@koa/router'
import Logger from 'utils/logger'
import validator, { ValidationSource } from 'utils/validator'

import EstimateController from './estimate.controller'
import EstimateService from './estimate.service'
import { schemaGetEstimate } from './schemas'

export const router = new Router()

const logger = new Logger('ESTIMATE')
const service = new EstimateService()
const controller = new EstimateController(logger, service)

router.get('/estimate',
  validator(schemaGetEstimate, ValidationSource.QUERY),
  (ctx) => controller.getEstimateFromTo(ctx)
)
