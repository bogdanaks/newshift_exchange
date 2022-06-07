import { CNListAvailableCurrencies } from 'api/changenow/interfaces'
import { Repository, FindOptionsWhere } from 'typeorm'

import { connection } from './../index'
import { Currency } from './currencies.entity'

class CurrenciesRepository {
  readonly repository: Repository<Currency>

  constructor() {
    this.repository = connection.getRepository(Currency)
  }

  async getCurrencyBy(where: FindOptionsWhere<Currency>): Promise<Currency> {
    return await this.repository.findOneBy(where)
  }

  async getCurrencies(): Promise<Currency[]> {
    return await this.repository.find()
  }

  async updateCurrencies(currencies: CNListAvailableCurrencies[]): Promise<void> {
    currencies.forEach(async (currency) => {
      const findCurrency = await this.repository.findOneBy({ ticker: currency.ticker })
      if (!findCurrency) {
        try {
          const newCurrency = new Currency()
          newCurrency.ticker = currency.ticker
          newCurrency.name = currency.name
          newCurrency.featured = currency.featured
          newCurrency.has_external_id = currency.hasExternalId
          newCurrency.image = currency.image
          newCurrency.is_fiat = currency.isFiat
          newCurrency.is_stable = currency.isStable
          newCurrency.supports_fixed_rate = currency.supportsFixedRate
          newCurrency.network = currency.network
          newCurrency.token_contract = currency.tokenContract
          newCurrency.buy = currency.buy
          newCurrency.sell = currency.sell
          newCurrency.legacy_ticker = currency.legacyTicker
          await this.repository.save(newCurrency)
          return
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
}

export default new CurrenciesRepository()