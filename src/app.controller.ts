import { Controller, Get } from "@nestjs/common";
const SporList = require('./assets/static-files/spor-list.json');
const DietList = require('./assets/static-files/diyet-list.json');

@Controller('')
export class AppController {
    constructor(){

    }

    @Get('spor-list')
    getSportList(){
        return SporList;
    }

    @Get('diet-list')
    getDietList(){
        return DietList;
    }
    
}