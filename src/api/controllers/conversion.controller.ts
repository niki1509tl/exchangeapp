import { Body, Controller, Post } from "@nestjs/common";
import { ConversionService } from "src/business/services/conversion.sevice";
import { ConvertValue } from "src/common/dto/ConvertValue.dto";

@Controller({ path: '/api/conversion' })
export class ConversionController {
    constructor(
        private readonly conversionService: ConversionService
    ) { }

    @Post('/convert')
    async convertValue(@Body() data: ConvertValue) {
        return this.conversionService.convertAmount(data)
    }
}