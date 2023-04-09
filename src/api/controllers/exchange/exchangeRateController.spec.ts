import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from './exchange.controller';
import { ExchangeRateService } from '../../../business/services/exchangeRates.service';

describe('ExchangeController', () => {
    let exchangeController: ExchangeRateController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ExchangeRateController],
            providers: [ExchangeRateService],
        }).compile();

        exchangeController = app.get<ExchangeRateController>(ExchangeRateController);
    });

    describe('getExchangeRate', () => {
        it('should return the expected exchange rate for a valid currency pair', async () => {
            const exchangeRate = await exchangeController.getExchangeRate('EUR_USD');
            expect(exchangeRate).toBeGreaterThan(0);
        });

        it('should throw an error for an invalid currency pair format', async () => {
            await expect(exchangeController.getExchangeRate('wrong format',)).rejects.toThrow();
        });

        it('should throw an error for an invalid currency pair', async () => {
            await expect(exchangeController.getExchangeRate('USDt_EURt',)).rejects.toThrow();
        });

    });
});
