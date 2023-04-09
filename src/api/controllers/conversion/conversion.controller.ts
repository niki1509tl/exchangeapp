import { Body, Controller, Post } from "@nestjs/common";
import { ConversionService } from "../../../business/services/conversion.sevice";
import { ConvertValue } from "../../..//common/dto/ConvertValue.dto";
import { ConvertionList } from "../../..//common/dto/ConvertionList.dto";

@Controller({ path: '/api/conversion' })
export class ConversionController {
    constructor(
        private readonly conversionService: ConversionService
    ) { }

    @Post('/convert')
    async convertValue(@Body() data: ConvertValue) {
        return this.conversionService.convertAmount(data)
    }

    @Post('/list')
    async getConversions(@Body() data: ConvertionList) {
        return this.conversionService.getConversions(data)
    }
}