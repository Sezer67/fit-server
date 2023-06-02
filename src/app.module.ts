import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AppController } from './app.controller';
import { TestModule } from './test/test.module';
import { FatRateModule } from './fat-rate-data/fat-rate-data.module';
import { VkiModule } from './vki-data/vki.data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    TestModule,
    FatRateModule,
    VkiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
