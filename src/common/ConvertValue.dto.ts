import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class ConvertValue {
    @IsNumber()
    @Min(0)
    sourceAmount: number

    @IsString()
    @IsNotEmpty()
    sourceCurrency: string

    @IsString()
    @IsNotEmpty()
    targetCurrency: string
}