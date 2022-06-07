import Joi from 'joi'
import { Context, Next } from 'koa'

import Logger from './logger'
import errorBuilder from './error-builder'

const logger = new Logger('VALIDATOR')

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAMS = 'params',
}

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => async (
  ctx: Context,
  next: Next,
) => {
  let data

  switch (source) {
    case 'body':
      data = ctx.request[source]
      break
    case 'query':
      data = ctx[source]
      break
    case 'params':
      data = ctx[source]
      break
    case 'headers':
      data = ctx.request[source]
      break

    default:
      break
  }

  const { error, value } = schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  })

  if (!error) {
    ctx.request[source] = value

    return await next()
  }

  const message = error.details.map((i) => i.message.replace(/['"]+/g, '')).join(',')
  logger.error(message)

  throw errorBuilder.buildInvalidRequestParamsError(error)
}
