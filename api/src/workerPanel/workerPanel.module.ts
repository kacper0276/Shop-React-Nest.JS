import { Module } from '@nestjs/common';
import { workerPanelController } from './workerPanel.controller';
import { WorkerPanelService } from './workerPanel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Orders from 'src/dtos/Orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [workerPanelController],
  providers: [WorkerPanelService],
})
export class WorkerPanelModule {}
