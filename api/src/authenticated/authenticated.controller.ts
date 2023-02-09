import { Controller } from '@nestjs/common';
import { AuthenticatedService } from './authenticated.service';

@Controller('authenticated')
export class AuthenticatedController {
  constructor(private authenticatedService: AuthenticatedService) {}
}
