import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionService } from 'src/business/services/conversion.sevice';
import { ExchangeRateService } from 'src/business/services/exchangeRates.service';
import { TransactionsEntity } from 'src/db/schemas/transaction.schema';
import TransactionStorage from 'src/db/transaction.storage';
import { ConversionController } from '../controllers/conversion.controller';
import { ExchangeRateController } from '../controllers/exchange.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionsEntity])],
    providers: [TransactionStorage, ConversionService, ExchangeRateService],
    controllers: [ConversionController, ExchangeRateController],
})
export class TransactionModule { }
