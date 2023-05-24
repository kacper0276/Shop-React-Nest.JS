import { Controller, Get } from '@nestjs/common';
import { WorkerPanelService } from './workerPanel.service';

@Controller('workerpanel')
export class workerPanelController {
  constructor(private workerPanelService: WorkerPanelService) {}

  @Get('/getorderstodo')
  async getOrdersToDo() {
    return this.workerPanelService.getOrdersToDo();
  }

  @Get('/getordersinprogress')
  async getOrdersInProgress() {
    return this.workerPanelService.getOrdersInProgress();
  }

  @Get('/getcompletedorders')
  async getCompletedOrders() {
    return this.workerPanelService.getCompletedOrders();
  }
}
