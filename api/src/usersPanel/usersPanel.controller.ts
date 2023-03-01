import { Controller, Post, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { loginType } from 'src/types/loginType';
import UsersPanelService from './usersPanel.service';

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
