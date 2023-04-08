import { v4 as uuidv4 } from 'uuid';
import defaultExhcnageService, { ExchangeRateService } from './exchangeRates.service';
import { ConvertValue } from 'src/common/ConvertValue.dto';

export class ConversionService {
    constructor(
        protected exchangeRateService: ExchangeRateService = defaultExhcnageService
    ) { }

    async convertAmount(data: ConvertValue): Promise<{ amount: number, transactionId: string }> {
        const exchangeRate = await this.exchangeRateService.getExchangeRate(`${data.sourceCurrency}_${data.targetCurrency}`);
        const amount = Number((data.sourceAmount * exchangeRate).toFixed(2));
        const transactionId = uuidv4();
        // TODO save the conversion details to the database
        return { amount, transactionId };
    }
}

export default new ConversionService()