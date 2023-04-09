import { Controller, Get, Param } from "@nestjs/common";
import { ExchangeRateService } from "src/business/services/exchangeRates.service";

@Controller({ path: '/api/exchange' })
export class ExchangeRateController {
    constructor(
        private readonly exchangeRateService: ExchangeRateService
    ) { }

    @Get('/:currencyPair')
    async getExchangeRate(@Param('currencyPair') currencyPair: string) {
        return this.exchangeRateService.getExchangeRate(currencyPair)
    }
}