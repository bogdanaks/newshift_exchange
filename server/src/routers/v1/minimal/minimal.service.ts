import CNApi from 'api/changenow'
import NodeCache from 'node-cache'

class Service {
  private readonly cacheManager: NodeCache
  constructor() {
    this.cacheManager = new NodeCache()
  }

  async getMinimalFromTo({
    from,
    to,
  }: {
    from: string
    to: string
  }): Promise<any> {
    const pairKey = `MINIMAL:${from.toLowerCase()}_${to.toLowerCase()}`
    const cacheEstimate: number = this.cacheManager.get(pairKey)
    if (cacheEstimate) return cacheEstimate

    const minimal = await CNApi.getMinimalExchangeAmount({
      from,
      to,
    })
    this.cacheManager.set(pairKey, minimal.minAmount, 60)

    return minimal.minAmount
  }
}

export default Service
