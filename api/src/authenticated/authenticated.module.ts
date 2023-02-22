import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { AuthenticatedController } from './authenticated.controller';
import { AuthenticatedService } from './authenticated.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthenticatedController],
  providers: [AuthenticatedService],
})
export class AuthenticatedModule {}
