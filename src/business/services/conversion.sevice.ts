import { v4 as uuidv4 } from 'uuid';
import { ExchangeRateService } from './exchangeRates.service';

export class ConversionService {
    constructor(private exchangeRateService: ExchangeRateService) { }

    async convertAmount(sourceAmount: number, sourceCurrency: string, targetCurrency: string): Promise<{ amount: number, transactionId: string }> {
        try {
            const exchangeRate = await this.exchangeRateService.getExchangeRate(`${sourceCurrency}_${targetCurrency}`);
            const amount = sourceAmount * exchangeRate;
            const transactionId = uuidv4();
            // TODO save the conversion details to the database
            return { amount, transactionId };
        } catch (error) {
            console.error(`Error converting ${sourceAmount} ${sourceCurrency} to ${targetCurrency}: ${error.message}`);
            throw new Error('Conversion failed');
        }
    }
}