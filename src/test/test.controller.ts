import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { AuthGuard } from '@nestjs/passport';
import { FatRateCalculateDto, VkiCalculateDto } from './dto/calculate.dto';

@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Post('fat-rate')
  @UseGuards(AuthGuard('user'))
  fatRateTest(@Body() dto: FatRateCalculateDto, @Req() req: any) {
    return this.service.calculateFatRate(dto, req.user);
  }

  @Post('vki')
  @UseGuards(AuthGuard('user'))
  vkiTest(@Body() dto: VkiCalculateDto, @Req() req: any) {
    return this.service.calculateVki(dto, req.user);
  }

  @Get('@me')
  @UseGuards(AuthGuard('user'))
  getMyTest(@Req() req: any) {
    return this.service.getMyTestResult(req.user);
  }

  @Get('vki/:id')
  @UseGuards(AuthGuard('user'))
  getMyVkiTestDatas(@Param('id') id: string) {
    return this.service.getMyVkiTestDatas(id);
  }

  @Get('fat-rate/:id')
  @UseGuards(AuthGuard('user'))
  getMyFatRateTestDatas(@Param('id') id: string) {
    return this.service.getMyFatRateTestDatas(id);
  }
}
