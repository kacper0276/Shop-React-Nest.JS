import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { registerType } from 'src/types/registerType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import addMinutes from 'src/helpers/addTimeFunction';
import { loginType } from 'src/types/loginType';

@Injectable()
export class AuthenticatedService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async registerFunction(registerData: registerType) {
    const { email } = registerData,
      { password } = registerData,
      { second_password } = registerData;

    const userExist = await this.usersRepository.findBy({
      email: email,
    });

    const linkExpiredTime = addMinutes(new Date(), 10);

    const salt = bcrypt.genSaltSync(10);

    if (password !== second_password) {
      return { message: 'Hasła nie są takie same' };
    }

    if (email.includes('@') === false) {
      return { message: 'Twój login nie jest emailem' };
    }

    if (password.length < 6) {
      return { message: 'Twoje hasło jest za krótkie' };
    }

    if (userExist.length > 0) {
      return { message: 'Użytkownik o takim emailu istnieje' };
    }

    const hashPassword = await bcrypt.hashSync(password, salt);

    const registerUser = {
      email: email,
      password: hashPassword,
      linkExpired: linkExpiredTime,
      userType: 'user',
    };

    await this.usersRepository.save(registerUser);
    return { message: 'Zarejestrowano, sprawdź maila by aktywować konto' };
  }

  async loginFunction(loginData: loginType) {
    const { email } = loginData,
      { password } = loginData;

    console.log(`email: ${email} password: ${password}`);

    const userExist = await this.usersRepository.findBy({
      email: email,
    });

    if (userExist.length > 0) {
      const comparePassword = await bcrypt.compare(
        password,
        userExist[0].password,
      );

      if (comparePassword === true && userExist[0].isActive === true) {
        return {
          username: userExist[0].email,
          userType: userExist[0].userType,
        };
      } else {
        return { message: 'Błędny email lub hasło' };
      }
    } else {
      return { message: 'Błędny email lub hasło' };
    }
  }
}
