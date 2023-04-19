import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export default class ProductsModule {}
