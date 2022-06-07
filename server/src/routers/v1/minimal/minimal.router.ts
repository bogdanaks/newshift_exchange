import Router from '@koa/router'
import Logger from 'utils/logger'
import validator, { ValidationSource } from 'utils/validator'

import MinimalController from './minimal.controller'
import MinimalService from './minimal.service'
import { schemaGetMinimal } from './schemas'

export const router = new Router()

const logger = new Logger('MINIMAL')
const service = new MinimalService()
const controller = new MinimalController(logger, service)

router.get('/minimal',
  validator(schemaGetMinimal, ValidationSource.QUERY),
  (ctx) => controller.getMinimalFromTo(ctx)
)
