import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { GenderEnum } from "src/enums/user.enum";

export class FatRateCalculateDto {
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    neck: number;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    waist: number;

    @IsNotEmpty()
    @IsNumber()
    hip: number;

    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: GenderEnum;
}

export class VkiCalculateDto {
    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    weight: number;
}