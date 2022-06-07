import CNApi from 'api/changenow'
import CurrenciesRepository from 'models/currencies/currencies.repository'

class CurrenciesJob {
  async updateCurrencies(): Promise<void> {
    console.log('Start update currencies list')

    const currencies = await CNApi.getListAvailableCurrencies()
    await CurrenciesRepository.updateCurrencies(currencies)

    console.log(`Finished update currencies list - currencies ${currencies.length}`)
  }

  async init(): Promise<void> {
    await this.updateCurrencies()
  }
}

export default new CurrenciesJob()