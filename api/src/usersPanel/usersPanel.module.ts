import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { UsersPanelController } from './usersPanel.controller';
import UsersPanelService from './usersPanel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersPanelController],
  providers: [UsersPanelService],
})
export default class UsersPanelModule {}
