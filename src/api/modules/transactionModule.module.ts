import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionService } from 'src/business/services/conversion.sevice';
import { ExchangeRateService } from 'src/business/services/exchangeRates.service';
import { TransactionEntity } from 'src/db/schemas/transaction.schema';
import TransactionStorage from 'src/db/transaction.storage';
import { ConversionController } from '../controllers/conversion/conversion.controller';
import { ExchangeRateController } from '../controllers/exchange/exchange.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    providers: [TransactionStorage, ConversionService, ExchangeRateService],
    controllers: [ConversionController, ExchangeRateController],
})
export class TransactionModule { }
