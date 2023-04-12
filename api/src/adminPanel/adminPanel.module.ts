import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';
import ProductsType from 'src/dtos/ProductsType.entity';
import { RabatCode } from 'src/dtos/RabatCode.entity';
import { Users } from 'src/dtos/Users.entity';
import { AdminPanelController } from './adminPanel.controller';
import { AdminPanelService } from './adminPanel.service';
import Slider from 'src/dtos/Slider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, ProductsType, RabatCode, Auction, Slider]),
  ],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
