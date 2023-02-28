import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UsersPanelService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
}
