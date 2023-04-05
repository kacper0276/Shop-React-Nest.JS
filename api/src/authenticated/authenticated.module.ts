require('dotenv').config();
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { AuthenticatedController } from './authenticated.controller';
import { AuthenticatedService } from './authenticated.service';
import { ConfigModule } from '@nestjs/config';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Users]),
    MailerModule.forRoot(mailerConfig),
  ],
  controllers: [AuthenticatedController],
  providers: [AuthenticatedService],
})
export class AuthenticatedModule {}
