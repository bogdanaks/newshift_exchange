import { Context } from 'koa'

export const responseOk = (ctx: Context, data?: any, limit?: number, page?: number, all?: number) => {
  ctx.status = 200
  ctx.body = {
    data,
    limit: limit || undefined,
    page: page ?? undefined,
    all: all || undefined,
    statusCode: ctx.status,
  }
  return ctx
}

export const responseError = (ctx: Context, data?: any) => {
  ctx.status = data.statusCode
  ctx.body = data
  return ctx
}
