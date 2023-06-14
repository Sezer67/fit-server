import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ContactAdminDto } from 'src/user/dto/contact-admin.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendVerificationMail(user: User, token: string) {
    try {
      const url = process.env.CLIENT_URL + '/EmailVerify?token=' + token;
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Hesap Doğrulama Maili',
        template: './email-verification',
        context: {
          name: user.fullName,
          url,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async contactAdmin(data: ContactAdminDto) {
    try {
      await this.mailService.sendMail({
        to: process.env.ADMIN_MAIL,
        subject: data.subject,
        template: './contact-admin',
        context: {
          ...data,
        },
      });

      return {
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }
}
