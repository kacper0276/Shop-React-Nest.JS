import { Controller, Post, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { loginType } from 'src/types/loginType';
import { registerType } from 'src/types/registerType';
import { AuthenticatedService } from './authenticated.service';

@Controller('authenticated')
export class AuthenticatedController {
  constructor(private authenticatedService: AuthenticatedService) {}

  @Post('/register')
  async registerFunction(@Body() registerData: registerType) {
    return await this.authenticatedService.registerFunction(registerData);
  }

  @Post('/login')
  async loginFunction(@Body() loginData: loginType) {
    return await this.authenticatedService.loginFunction(loginData);
  }

  @Post('/confirmaccount/:username')
  async confirmAccountFunction(@Param('username') username: string) {
    return await this.authenticatedService.confirmAccount(username);
  }

  @Post('/forgotpasswordsendlink/:username')
  async sendEmailForgotPassword(@Param('username') username: string) {
    return await this.authenticatedService.sendEmailForgotPassword(username);
  }

  @Post('/changepassword')
  async changePassword(@Body() registerData: registerType) {
    return await this.authenticatedService.changePassword(registerData);
  }
}
