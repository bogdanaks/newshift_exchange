import axios, { AxiosInstance, AxiosResponse } from 'axios'
import config, { CN_API_KEY } from 'config'

import { CNListAvailableCurrencies, EstimatedExchangeAmountResponse, MinimalExchangeAmountResponse } from './interfaces'

class ChangeNowApi {
  private readonly api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: config.CN_API,
    })
  }

  async estimatedExchangeAmount({
    fromCurrency,
    toCurrency,
    amount,
  }: {
    fromCurrency: string
    toCurrency: string
    amount: string
  }): Promise<EstimatedExchangeAmountResponse> {
    const { data } = await this.api.get<any, AxiosResponse<EstimatedExchangeAmountResponse>>(
      `/v1/exchange-amount/${amount}/${fromCurrency}_${toCurrency}/?api_key=${CN_API_KEY}`,
      {
        timeout: 3000,
      }
    )

    return data
  }

  async getListAvailableCurrencies(): Promise<CNListAvailableCurrencies[]> {
    const { data } = await this.api.get<any, AxiosResponse<CNListAvailableCurrencies[]>>('/v2/exchange/currencies?active=&flow=standard', { timeout: 3000 })

    return data
  }

  async getMinimalExchangeAmount({ from, to }: { from: string, to: string }): Promise<MinimalExchangeAmountResponse> {
    const { data } = await this.api.get(`/v1/min-amount/${from}_${to}?api_key=${config.CN_API_KEY}`, { timeout: 3000 })

    return data
  }
}

export default new ChangeNowApi()