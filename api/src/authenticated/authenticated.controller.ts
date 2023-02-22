import { Controller, Post, Body } from '@nestjs/common';
import { registerType } from 'src/types/registerType';
import { AuthenticatedService } from './authenticated.service';

@Controller('authenticated')
export class AuthenticatedController {
  constructor(private authenticatedService: AuthenticatedService) {}

  @Post('/register')
  async registerFunction(@Body() registerData: registerType) {
    return await this.authenticatedService.registerFunction(registerData);
  }
}
