import { v4 as uuidv4 } from 'uuid';
import { ExchangeRateService } from './exchangeRates.service';
import { ConvertValue } from 'src/common/dto/ConvertValue.dto';
import { Injectable } from '@nestjs/common';
import TransactionStorage from 'src/db/transaction.storage';

@Injectable()
export class ConversionService {
    constructor(
        private readonly exchangeRateService: ExchangeRateService,
        private readonly transactionStorage: TransactionStorage
    ) { }

    async convertAmount(data: ConvertValue): Promise<{ amount: number, transactionId: string }> {
        const exchangeRate = await this.exchangeRateService.getExchangeRate(`${data.sourceCurrency}_${data.targetCurrency}`);
        const amount = Number((data.sourceAmount * exchangeRate).toFixed(2));
        const transactionId = uuidv4();
        this.transactionStorage.create({
            id: transactionId,
            created_at: new Date(),
            sourceAmount: amount,
            from: data.sourceCurrency,
            to: data.targetCurrency,
        })
        return { amount, transactionId };
    }
}