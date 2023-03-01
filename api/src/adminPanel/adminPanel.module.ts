import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsType from 'src/dtos/ProductsType.entity';
import { RabatCode } from 'src/dtos/RabatCode.entity';
import { Users } from 'src/dtos/Users.entity';
import { AdminPanelController } from './adminPanel.controller';
import { AdminPanelService } from './adminPanel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ProductsType, RabatCode])],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
