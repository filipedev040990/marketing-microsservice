import { ForbiddenError, ServerError, UnauthorizedError } from '@/shared/errors'
import { HttpResponse } from '@/shared/types'

export const success = (statusCode: number, body: any): HttpResponse => ({
  statusCode,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbiddenError = (): HttpResponse => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})
