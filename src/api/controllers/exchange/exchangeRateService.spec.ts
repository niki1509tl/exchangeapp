import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from 'src/api/controllers/exchange/exchange.controller';
import { TransactionModule } from 'src/api/modules/transactionModule.module';
import { ExchangeRateService } from 'src/business/services/exchangeRates.service';

describe('ExchangeController', () => {
    let exchangeController: TransactionModule;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ExchangeRateController],
            providers: [ExchangeRateService],
        }).compile();

        exchangeController = app.get<ExchangeRateController>(ExchangeRateController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(exchangeController).toBe('Hello World!');
        });
    });
});
