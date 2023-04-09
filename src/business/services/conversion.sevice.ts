import { v4 as uuidv4 } from 'uuid';
import { ExchangeRateService } from './exchangeRates.service';
import { ConvertValue } from '../../common/dto/ConvertValue.dto';
import { Injectable } from '@nestjs/common';
import TransactionStorage from '../../db/transaction.storage';
import { TransactionEntity } from '../../db/schemas/transaction.schema';
import { ConvertionList } from '../../common/dto/ConvertionList.dto';

@Injectable()
export class ConversionService {
    constructor(
        private readonly exchangeRateService: ExchangeRateService,
        private readonly transactionStorage: TransactionStorage
    ) { }

    async convertAmount(data: ConvertValue): Promise<{ amount: number, transactionid: string }> {
        const exchangeRate = await this.exchangeRateService.getExchangeRate(`${data.sourceCurrency}_${data.targetCurrency}`);
        const amount = Number((data.sourceAmount * exchangeRate).toFixed(2));
        const transactionid = uuidv4();
        this.transactionStorage.create({
            transactionid,
            created_at: new Date(),
            sourceAmount: amount,
            from: data.sourceCurrency,
            to: data.targetCurrency,
        })
        return { amount, transactionid };
    }

    async getConversions(data: ConvertionList): Promise<{ conversions: TransactionEntity[], totalCount: number }> {
        if (!data.transactionid && !data.transactionDate) throw new Error('At least one of the following parameters is required: transactionid, transactionDate')
        if (data.transactionid) {
            const result = await this.transactionStorage.findBytransactionid(data.transactionid!)
            return { conversions: result, totalCount: result.length }
        }
        if (data.transactionDate) return await this.transactionStorage.findAfterDate(data.transactionDate!, data.page, data.limit)
    }
}