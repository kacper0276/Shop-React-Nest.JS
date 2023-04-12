import { Controller, Post, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { loginType } from 'src/types/loginType';
import UsersPanelService from './usersPanel.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('/edituserdata/:username')
  async editUserData(
    @Param('username') username: string,
    @Body() newData: loginType,
  ) {
    return await this.usersPanelService.editUserData(username, newData);
  }
}
