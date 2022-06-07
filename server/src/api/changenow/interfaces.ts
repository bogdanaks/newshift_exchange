export interface CNListAvailableCurrencies {
  ticker: string
  name: string
  image: string
  hasExternalId: boolean
  isFiat: boolean
  featured: boolean
  isStable: boolean
  supportsFixedRate: boolean
  network: string
  tokenContract: string | null
  buy: boolean
  sell: boolean
  legacyTicker: string
}

export interface EstimatedExchangeAmountResponse {
  estimatedAmount: number
  transactionSpeedForecast: string
  warningMessage: null | string
}

export interface MinimalExchangeAmountResponse {
  minAmount: number
}
