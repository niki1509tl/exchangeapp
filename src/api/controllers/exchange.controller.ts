import { Controller, Get, Param } from "@nestjs/common";
import defaultExchangeRateService, { ExchangeRateService } from "src/business/services/exchangeRates.service";

@Controller({ path: '/api/exchange' })
export class ExchangeRateController {
    constructor(
        protected exchangeRateService: ExchangeRateService = defaultExchangeRateService
    ) { }

    @Get('/:currencyPair')
    async getExchangeRate(@Param('currencyPair') currencyPair: string) {
        return this.exchangeRateService.getExchangeRate(currencyPair)
    }
}