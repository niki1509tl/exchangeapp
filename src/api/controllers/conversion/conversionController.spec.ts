import { Test, TestingModule } from '@nestjs/testing';
import { ConversionController } from './conversion.controller';
import { AppModule } from '../../../app.module';
import { TransactionModule } from '../../../api/modules/transactionModule.module';
import { TransactionEntity } from '../../../db/schemas/transaction.schema';

describe('Conversion Controller', () => {
    let conversionController: ConversionController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TransactionModule]
        }).compile();

        conversionController = app.get<ConversionController>(ConversionController);
    });

    describe('convert', () => {
        it('should return the expected target amount and a valid transaction ID for valid input', async () => {
            const { amount, transactionid } = await conversionController.convertValue({ sourceAmount: 1500, sourceCurrency: 'EUR', targetCurrency: 'JPY' });
            expect(amount).toBeGreaterThan(0);
            expect(transactionid).toMatch(/^[a-z0-9\-]+$/);
        });

        it('should throw an error for invalid source/target input', async () => {
            try {
                await conversionController.convertValue({ sourceAmount: 1500, sourceCurrency: 'invalid', targetCurrency: 'JPY' })
                fail('Should have thrown an Error')
            } catch (err) {
                expect(err.message).toEqual('Source is not a valid currency symbol')
            }
        });

        it('should throw an error on negative value', async () => {
            try {
                await conversionController.convertValue({ sourceAmount: -200, sourceCurrency: 'EUR', targetCurrency: 'JPY' })
                fail('Should have thrown an Error')
            } catch (err) {
                expect(err.message).toEqual('Amount can not be negative');
            }
        })
    });

    describe('getConversions', () => {
        it('should throw an error if neither transactionid nor transactionDate are provided', async () => {
            try {
                await conversionController.getConversions({ page: 1, limit: 10 })
                fail('Should have thrown an Error')
            } catch (err) {
                expect(err.message).toEqual('At least one of the following parameters is required: transactionid, transactionDate')
            }
        })

        it('should return conversion for the specific transactionid', async () => {
            // Create a mock transaction
            const { transactionid } = await conversionController.convertValue({ sourceAmount: 1500, sourceCurrency: 'EUR', targetCurrency: 'JPY' });
            const { conversions } = await conversionController.getConversions({ transactionid, page: 1, limit: 10 });
            expect(conversions[0].transactionid).toEqual(transactionid);
        });

        it('should return conversions for the all transactions from the day before till now', async () => {
            const now = new Date()
            const oneDay = 24 * 60 * 60 * 1000;
            const previousDay = new Date((new Date(now.getTime() - oneDay)).toISOString().slice(0, 10));
            // Create a mock transaction
            await conversionController.convertValue({ sourceAmount: 1500, sourceCurrency: 'EUR', targetCurrency: 'JPY' });

            const result: { conversions: TransactionEntity[], totalCount: number } = await conversionController.getConversions({ transactionDate: previousDay, page: 1, limit: 10 });
            expect(result.totalCount).toBeGreaterThan(0);
        });
    });
});
