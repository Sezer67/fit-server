import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ContactAdminDto } from './dto/contact-admin.dto';
import { UserUpdateDto } from './dto/user-update.dto';

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
  emailVerify(@Req() req: any) {
    return this.service.emailVerify(req.user);
  }

  @Post('contact')
  contactToAdmin(@Body() dto: ContactAdminDto) {
    return this.service.contactAdmin(dto);
  }

  @Put('update')
  @UseGuards(AuthGuard('user'))
  userUpdate(@Body() dto: UserUpdateDto, @Req() req: any) {
    return this.service.userUpdate(dto, req.user);
  }
}
