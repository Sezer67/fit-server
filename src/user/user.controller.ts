import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('user'))
  get(@Req() req: any) {
    return req.user;
  }

  @Post('email-verify')
  @UseGuards(AuthGuard('user'))
  emailVerify(@Req() req:any){
    return this.service.emailVerify(req.user);
  }
}
