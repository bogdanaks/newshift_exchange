import CNApi from 'api/changenow'
import NodeCache from 'node-cache'

class Service {
  private readonly cacheManager: NodeCache
  constructor() {
    this.cacheManager = new NodeCache()
  }

  async getEstimateFromTo({
    from,
    to,
    amount,
  }: {
    from: string
    to: string
    amount: string
  }): Promise<any> {
    const pairKey = `ESTIMATE:${from.toLowerCase()}_${to.toLowerCase()}_${amount}`
    const cacheEstimate: number = this.cacheManager.get(pairKey)
    if (cacheEstimate) return cacheEstimate

    const estimate = await CNApi.estimatedExchangeAmount({
      fromCurrency: from,
      toCurrency: to,
      amount,
    })
    this.cacheManager.set(pairKey, estimate.estimatedAmount, 60)

    return estimate.estimatedAmount
  }
}

export default Service
