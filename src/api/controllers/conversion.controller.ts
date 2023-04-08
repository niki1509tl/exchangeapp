import { Body, Controller, Post } from "@nestjs/common";
import defaultConversionService, { ConversionService } from "src/business/services/conversion.sevice";
import { IConvertValue } from "src/common/IConvertValue";

@Controller({ path: '/api/conversion' })
export class ConversionController {
    constructor(
        protected conversionService: ConversionService = defaultConversionService
    ) { }

    @Post('/convert')
    async convertValue(@Body() data: IConvertValue) {
        return this.conversionService.convertAmount(data)
    }
}