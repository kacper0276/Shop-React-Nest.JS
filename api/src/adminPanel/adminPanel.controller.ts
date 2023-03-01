import { Controller, Post, Body } from '@nestjs/common';
import { rabatCodeType } from 'src/types/rabatCodeType';
import { AdminPanelService } from './adminPanel.service';

@Controller('adminpanel')
export class AdminPanelController {
  constructor(private adminPanelService: AdminPanelService) {}

  @Post('/addrabatcode')
  async addRabatCode(@Body() data: rabatCodeType) {
    return await this.adminPanelService.addRabatCode(data);
  }
}
