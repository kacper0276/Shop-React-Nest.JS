import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { auctionType } from 'src/types/auctionType';
import { loginType } from 'src/types/loginType';
import { rabatCodeType } from 'src/types/rabatCodeType';
import { AdminPanelService } from './adminPanel.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = {
  storage: diskStorage({
    destination: '../frontend/public/slider',
    filename: function (req, file, cb) {
      const name = Date.now() + Math.floor(Math.random() * 100) + '.jpg';

      cb(null, name);
    },
  }),
};

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
  @Post('/addtypeauction')
  async addType(@Body() data: auctionType) {
    return await this.adminPanelService.addAuctionType(data);
  }

  @Get('/getalltypesproducts')
  async getAllTypes() {
    return await this.adminPanelService.getAllTypesProducts();
  }

  @Post('/deleteauctiontype/:name')
  async deleteAuctionType(@Param('name') name: string) {
    return this.adminPanelService.deleteAuctionType(name);
  }

  @Post('/editauctiontype')
  async editAuctionType(@Body() data: auctionType) {
    return this.adminPanelService.editAuctionType(data);
  }

  // Slider panel
  @Post('/addphotoslider')
  @UseInterceptors(FileInterceptor('img', storage))
  async addPhotoSlider(@UploadedFile() file) {
    return this.adminPanelService.addPhotoSlider(file);
  }

  @Get('/allphotosinslider')
  async getAllPhotosInSlider() {
    return this.adminPanelService.getAllPhotosInSlider();
  }
}
