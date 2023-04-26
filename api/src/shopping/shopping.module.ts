import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';
import Orders from 'src/dtos/Orders.entity';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/config/mailer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction, Orders]),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot(mailerConfig),
  ],
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class ShoppingModule {}
