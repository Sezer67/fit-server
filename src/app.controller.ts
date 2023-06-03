import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
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
            const filter =  SporList.filter((spor: any) => spor.title.toLowerCase() === dto.title.toLowerCase());
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

    @Get('list/:name')
    getDataByName(@Param('name') title: string){
        let result = null;

        const filterDiet =  DietList.filter((diet: any) => diet.title.toLowerCase() === title.toLowerCase());
        if(filterDiet.length < 1 ){
            const filterSpor =  SporList.filter((spor: any) => spor.title.toLowerCase() === title.toLowerCase());
            if(filterSpor.length > 0){
                result = filterSpor[0];
            }
        } else {
            result = filterDiet[0];
        }

        if(!result) throw new HttpException(`'${title}' programı bulunamadı`,HttpStatus.BAD_REQUEST);

        return result;
    }
    
}