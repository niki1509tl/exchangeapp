import axios from 'axios';

class ExchangeRateService {
  async getExchangeRate(currencyPair: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.fixer.io/latest?base=${currencyPair}`,
      );
      const exchangeRate = response.data.rates[currencyPair];
      return exchangeRate;
    } catch (error) {
      console.error(
        `Error retrieving exchange rate for ${currencyPair}: ${error.message}`,
      );
      throw new Error('Exchange rate not available');
    }
  }
}
