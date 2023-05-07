import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendVerificationMail(user: User, token: string){
    try {
      const url = process.env.CLIENT_URL + '/emailVerification?token=' + token;
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Hesap Doğrulama Maili',
        template: './email-verification',
        context: {
          name: user.fullName,
          url,
        }
      });
      
    } catch (error) {
      throw error;  
    }
  }
}
