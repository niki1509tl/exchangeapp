import { v4 as uuidv4 } from 'uuid';
import defaultExhcnageService, { ExchangeRateService } from './exchangeRates.service';
import { IConvertValue } from 'src/common/IConvertValue';

export class ConversionService {
    constructor(
        protected exchangeRateService: ExchangeRateService = defaultExhcnageService
    ) { }

    async convertAmount(data: IConvertValue): Promise<{ amount: number, transactionId: string }> {
        try {
            const exchangeRate = await this.exchangeRateService.getExchangeRate(`${data.sourceCurrency}_${data.targetCurrency}`);
            const amount = Number((data.sourceAmount * exchangeRate).toFixed(2));
            const transactionId = uuidv4();
            // TODO save the conversion details to the database
            return { amount, transactionId };
        } catch (error) {
            console.error(`Error converting ${data.sourceAmount} ${data.sourceCurrency} to ${data.targetCurrency}: ${error.message}`);
            throw new Error('Conversion failed');
        }
    }
}

export default new ConversionService()