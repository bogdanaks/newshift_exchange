/* eslint-disable no-console */
import { AxiosResponse } from 'axios'

import { asyncStorage } from './async-storage'

enum LEVELS {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
}

enum CONSOLE_COLORS {
  BASE = '\x1b[0m',
  INFO = '\x1b[34m',
  ERROR = '\x1b[31m',
  WARN = '\x1b[33m',
  PURPLE = '\x1b[35m',
  CYAN = '\x1b[36m',
}

function generateNewLogId(): string {
  return Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8)
}

class Logger {
  protected name: string

  constructor (name = '') {
    this.name = name
  }

  setLogId(): void {
    const newLogId = generateNewLogId()
    const store = asyncStorage.getStore()
    // @ts-expect-error
    store.set('logId', newLogId)
  }

  formatLog (level: string, message: string, color?: string): string {
    const store = asyncStorage.getStore()
    // @ts-expect-error
    const logId = store?.get('logId')

    message = `${color || ''}${level}${CONSOLE_COLORS.BASE}: ${CONSOLE_COLORS.PURPLE}[${this.name}]${CONSOLE_COLORS.BASE} ${CONSOLE_COLORS.CYAN}[${logId}]${CONSOLE_COLORS.BASE}: ${new Date().toJSON().slice(0, -1)} ${message}`
    return message
  }

  log (message: string, level?: string): void {
    console.log(this.formatLog(level, message))
  }

  verbose (message: string): void {
    console.log(this.formatLog(LEVELS.VERBOSE, message))
  }

  debug (message: string): void {
    console.log(this.formatLog(LEVELS.DEBUG, message))
  }

  info (message: string): void {
    console.log(this.formatLog(LEVELS.INFO, message, CONSOLE_COLORS.INFO))
  }

  warn (message: string): void {
    console.log(this.formatLog(LEVELS.WARN, message, CONSOLE_COLORS.WARN))
  }

  error(message: string, ex?: Error): void {
    if (ex?.message) {
      message += ` ErrorMsg: ${ex.message}`
    }

    console.error(this.formatLog(LEVELS.ERROR, message, CONSOLE_COLORS.ERROR))
  }

  externalError(message: string, error: AxiosResponse): void {
    console.error(this.formatLog(LEVELS.ERROR, `CODE: ${error.status}, STATUS: ${error.statusText}, ERROR_MESSAGE: ${message}, URL: ${error.request.res.responseUrl}, METHOD: ${error.config.method}, DATA: ${error.config.data}, PARAMS: ${JSON.stringify(error.config.params)}`))
  }
}

export default Logger
