import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateController } from './api/controllers/exchange.controller';
import { ConversionController } from './api/controllers/conversion.controller';
import { ExchangeRateService } from './business/services/exchangeRates.service';
import { ConversionService } from './business/services/conversion.sevice';

@Module({
  imports: [],
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
