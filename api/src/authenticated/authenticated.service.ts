import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { registerType } from 'src/types/registerType';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticatedService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async registerFunction(registerData: registerType) {
    console.log(registerData);
  }
}
