import { Controller } from '@nestjs/common';
import UsersPanelService from './usersPanel.service';

@Controller()
export default class UsersPanelController {
  constructor(private usersPanelService: UsersPanelService) {}
}
