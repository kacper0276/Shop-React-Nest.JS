import { Controller, Post, Body } from '@nestjs/common';
import {
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { loginType } from 'src/types/loginType';
import UsersPanelService from './usersPanel.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { userAuctionType } from 'src/types/userAuctionType';

const storage = {
  storage: diskStorage({
    destination: '../frontend/public/products',
    filename: function (req, file, cb) {
      const name = Date.now() + Math.floor(Math.random() * 100) + '.jpg';

      cb(null, name);
    },
  }),
};

@Controller('userspanel')
export class UsersPanelController {
  constructor(private usersPanelService: UsersPanelService) {}

  // Edit user data
  @Post('/edituserdata/:username')
  async editUserData(
    @Param('username') username: string,
    @Body() newData: loginType,
  ) {
    return await this.usersPanelService.editUserData(username, newData);
  }

  // User auctions
  @Post('/addauction')
  @UseInterceptors(FileInterceptor('img', storage))
  async addAuction(@UploadedFile() file, @Body() data: userAuctionType) {
    return this.usersPanelService.addAuction(file, data);
  }

  @Get('/getalluserproduct/:username')
  async getAllUserProduct(@Param('username') username: string) {
    return this.usersPanelService.getAllUserAuction(username);
  }

  @Post('/deleteauction/:id')
  async deleteAuction(@Param('id') id: number) {
    return this.usersPanelService.deleteAuction(id);
  }
}
