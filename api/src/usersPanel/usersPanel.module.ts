import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { UsersPanelController } from './usersPanel.controller';
import UsersPanelService from './usersPanel.service';
import Auction from 'src/dtos/Auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Auction])],
  controllers: [UsersPanelController],
  providers: [UsersPanelService],
})
export default class UsersPanelModule {}
