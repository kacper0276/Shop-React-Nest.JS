import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { loginType } from 'src/types/loginType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UsersPanelService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async editUserData(username: string, newData: loginType) {
    console.log(username);
    console.log('___________________');
    console.log(newData);
    const salt = bcrypt.genSaltSync(10);
    const { email } = newData,
      { password } = newData;

    if (email === '' && password.length > 6) {
      const hashPassword = await bcrypt.hashSync(password, salt);

      this.usersRepository.query(
        `UPDATE users SET password=${hashPassword} WHERE email=${username}`,
      );
      return { message: 'Zmieniono hasło' };
    } else if (password.length > 6 && email.includes('@')) {
      const hashPassword = await bcrypt.hashSync(password, salt);

      this.usersRepository.query(
        `UPDATE users SET password=${hashPassword}, email=${email} WHERE email=${username}`,
      );
      return { message: 'Zmieniono hasło i email' };
    } else {
      return { message: 'Błąd emaila lub za krótkie hasło' };
    }
  }
}
