import { Currency } from 'models/currencies/currencies.entity';
import CurrenciesRepository from 'models/currencies/currencies.repository'

class Service {
  async getCurrencies(): Promise<Currency[]> {
    return await CurrenciesRepository.getCurrencies()
  }
}

export default Service
