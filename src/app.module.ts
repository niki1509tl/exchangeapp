import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateController } from './api/controllers/exchange.controller';
import { ConversionController } from './api/controllers/conversion.controller';
import { ExchangeRateService } from './business/services/exchangeRates.service';
import { ConversionService } from './business/services/conversion.sevice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './db/schemas/transaction.schema';
import { TransactionModule } from './api/modules/transactionModule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'exchangeapp',
      entities: [TransactionsEntity],
      synchronize: true,
    }),
    TransactionModule
  ],
  controllers: [
    AppController,
    ExchangeRateController,
    ConversionController
  ],
  providers: [
    AppService,
    ExchangeRateService,
    ConversionService
  ],
})
export class AppModule { }
