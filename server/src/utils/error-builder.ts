export class CustomError extends Error {
  statusCode?: number
  code?: string
  message: string
}

function buildError(obj): CustomError {
  const error: CustomError = new CustomError()
  error.statusCode = obj.statusCode
  error.code = obj.code
  error.message = obj.message
  return error
}

class ErrorBuilder {
  buildInvalidAuthTokenError(errorMessage = null): CustomError {
    const defaultInvalidTokenError = {
      statusCode: 403,
      code: 'INVALID_AUTH_TOKEN',
      message: errorMessage || 'Invalid authorization token',
    }
    return buildError(defaultInvalidTokenError)
  }

  buildAccessDeniedError(errorMessage = null): CustomError {
    const defaultInvalidTokenError = {
      statusCode: 403,
      code: 'ACCESS_DENIED',
      message: errorMessage || 'Access denied',
    }
    return buildError(defaultInvalidTokenError)
  }

  buildExpiredAuthTokenError(errorMessage = null): CustomError {
    const defaultInvalidTokenError = {
      statusCode: 401,
      code: 'EXPIRED_AUTH_TOKEN',
      message: errorMessage || 'Invalid token: Access token has expired',
    }
    return buildError(defaultInvalidTokenError)
  }

  buildInvalidApiKeyError(errorMessage = null): CustomError {
    const defaultInvalidTokenError = {
      statusCode: 403,
      code: 'INVALID_API_KEY',
      message: errorMessage || 'Invalid api key',
    }
    return buildError(defaultInvalidTokenError)
  }

  buildInternalServerError(errorMessage = null): CustomError {
    const defaultInternalServerError = {
      statusCode: 500,
      code: 'INTERNAL_ERROR',
      message: errorMessage || 'The server encountered an internal error',
    }
    return buildError(defaultInternalServerError)
  }

  buildInvalidRequestParamsError(errorMessage = null): CustomError {
    const defaultInvalidInputParamsError = {
      statusCode: 400,
      code: 'INVALID_REQUEST_PARAMS',
      message: errorMessage || 'Incorrect request parameters',
    }
    return buildError(defaultInvalidInputParamsError)
  }

  buildBadRequestError(errorMessage = null): CustomError {
    const defaultBadRequestError = {
      statusCode: 400,
      code: 'BAD_REQUEST',
      message: errorMessage || 'Bad request error',
    }
    return buildError(defaultBadRequestError)
  }

  buildNotFoundError(errorMessage = null): CustomError {
    const defaultBadRequestError = {
      statusCode: 404,
      code: 'NOT_FOUND',
      message: errorMessage || 'Not found',
    }
    return buildError(defaultBadRequestError)
  }

  buildNoActiveApiKeysError(errorMessage = null): CustomError {
    const defaultNoActiveApiKeysError = {
      statusCode: 400,
      code: 'NO_ACTIVE_API_KEYS',
      message: errorMessage || 'No active api keys',
    }
    return buildError(defaultNoActiveApiKeysError)
  }
}

const errorBuilder = new ErrorBuilder()
export default errorBuilder
