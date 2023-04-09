import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class ConvertionList {
    @IsOptional()
    @IsString()
    transactionid?: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    transactionDate?: Date

    @IsNumber()
    @Min(1)
    page: number

    @IsNumber()
    @Min(1)
    limit: number
}