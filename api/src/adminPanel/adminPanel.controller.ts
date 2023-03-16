import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { loginType } from 'src/types/loginType';
import { rabatCodeType } from 'src/types/rabatCodeType';
import { AdminPanelService } from './adminPanel.service';

@Controller('adminpanel')
export class AdminPanelController {
  constructor(private adminPanelService: AdminPanelService) {}

  // Rabat code panel

  @Post('/addrabatcode')
  async addRabatCode(@Body() data: rabatCodeType) {
    return await this.adminPanelService.addRabatCode(data);
  }

  @Get('/getallrabatcode')
  async getAllRabats() {
    return await this.adminPanelService.getAllRabatCode();
  }

  @Get('/getdetailsonecode/:id')
  async getDetailsOneCode(@Param('id') id: number) {
    return await this.adminPanelService.getDetailsOneRabatCode(id);
  }

  @Post('/editcodedetails')
  async editCodeDetails(@Body() data: rabatCodeType) {
    return await this.adminPanelService.editCodeDetails(data);
  }

  @Get('/deleterabatcode/:id')
  async deleteRabatCode(@Param('id') id: number) {
    return await this.adminPanelService.deleteRabatCode(id);
  }

  // Users panel
  @Get('/getallusers')
  async getAllUsers() {
    return await this.adminPanelService.getAllUsers();
  }

  @Post('/changeuserdata/:id')
  async changeUserData(@Body() data: loginType, @Param('id') id: number) {
    return await this.adminPanelService.changeUserData(data, id);
  }

  @Post('/deleteuser/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.adminPanelService.deleteUser(id);
  }

  // Auaction panel
}
