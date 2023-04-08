import axios from 'axios';
import { axiosConfig } from 'src/configs/externalApi/http-headers';
export class ExchangeRateService {
  async getExchangeRate(currencyPair: string): Promise<number> {
    await this.validateData(currencyPair)
    const source = currencyPair.split('_')[0]
    const target = currencyPair.split('_')[1]
    const response = await axios.get(
      `https://api.apilayer.com/fixer/latest?symbols=${target}&base=${source}`,
      axiosConfig
    );
    const exchangeRate = response.data.rates[target];
    return exchangeRate;
  }

  private async validateData(currencyPair: string) {
    if (!currencyPair.includes('_')) throw new Error('Both currencies should be seperated with "_"')
    const source = currencyPair.split('_')[0]
    const target = currencyPair.split('_')[1]
    const response = await axios.get(
      `https://api.apilayer.com/fixer/symbols`,
      axiosConfig
    );
    const symbols = response.data.symbols
    if (!(source in symbols)) throw new Error('Source is not a valid currency symbol')
    if (!(target in symbols)) throw new Error('Target is not a valid currency symbol')
  }
}

export default new ExchangeRateService()