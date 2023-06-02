import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
const SporList = require('./assets/static-files/spor-list.json');
const DietList = require('./assets/static-files/diyet-list.json');

class LookupQueryDto {
    @IsOptional()
    @IsString()
    title?: string;
}

@Controller('')
export class AppController {
    constructor(){

    }

    @Get('spor-list')
    getSportList(@Query() dto: LookupQueryDto){
        if(dto.title){
            const filter =  SporList.filter((diet: any) => diet.title.toLowerCase() === dto.title.toLowerCase());
            if( filter.length < 1 ) throw new HttpException(`'${dto.title}' spor programı bulunamadı`,HttpStatus.BAD_REQUEST);
            return filter[0];
        }
        return SporList;
    }

    @Get('diet-list')
    getDietList(@Query() dto: LookupQueryDto){
        if(dto.title){
            const filter =  DietList.filter((diet: any) => diet.title.toLowerCase() === dto.title.toLowerCase());
            if( filter.length < 1 ) throw new HttpException(`'${dto.title}' diyet programı bulunamadı`,HttpStatus.BAD_REQUEST);
            return filter[0];
        }
        return DietList;
    }
    
}