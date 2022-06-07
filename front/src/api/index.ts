import axios, { AxiosResponse } from 'axios'

import { Currency } from './interfaces'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

interface Response<T> {
  data: T
  statusCode: number
}

export const getCurrencies = async (): Promise<Response<Currency[]>> => {
  const { data } = await api.get<any, AxiosResponse<Response<Currency[]>, any>, any>('/currencies')
  return data
}

export const getMinimalExchange = async ({
  from,
  to
}: {
  from: string
  to: string
}): Promise<Response<number>> => {
  const { data } = await api.get<any, AxiosResponse<Response<number>, any>, any>('/minimal', {
    params: {
      from,
      to,
    }
  })
  return data
}

export const getEstimateExchange = async ({
  from,
  to,
  amount,
}: {
  from: string
  to: string
  amount: string
}): Promise<Response<number>> => {
  const { data } = await api.get<any, AxiosResponse<Response<number>, any>, any>('/estimate', {
    params: {
      from,
      to,
      amount,
    }
  })
  return data
}
