import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { registerType } from 'src/types/registerType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import addMinutes from 'src/helpers/addTimeFunction';
import { loginType } from 'src/types/loginType';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthenticatedService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private readonly mailerService: MailerService,
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
      isActive: false,
      linkExpired: linkExpiredTime,
      userType: 'user',
    };

    await this.usersRepository.save(registerUser);
    this.mailerService.sendMail({
      to: `${registerUser.email}`,
      from: `"Adminisjtracja serwisu" <kacper4312@op.pl>`,
      subject: 'Potwierdzenie utworzenia konta',
      text: `Witaj, ${registerData.email} \n Kliknij w link, aby aktywować konto: http://localhost:3000/potwierdzenie/${registerData.email}`,
      html: `Witaj, ${registerData.email} \n Kliknij w link, aby aktywować konto: <a href="http://localhost:3000/potwierdzenie/${registerData.email}"> LINK </a>`,
    });
    return { message: 'Zarejestrowano, sprawdź maila by aktywować konto' };
  }

  async loginFunction(loginData: loginType) {
    const { email } = loginData,
      { password } = loginData;

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

  async confirmAccount(username: string) {
    const userExist = await this.usersRepository.findBy({
      email: username,
    });

    if (userExist.length > 0) {
      const expiredDate = Date.parse(userExist[0].linkExpired);
      const actualDate = Date.parse(new Date().toLocaleString('pl-PL'));

      if (expiredDate > actualDate) {
        this.usersRepository.query(
          `UPDATE users SET isActive=1 WHERE email='${username}'`,
        );
        return { message: 'Pomyślnie aktywowano konto' };
      } else {
        this.usersRepository.query(
          `DELETE FROM users WHERE email='${username}'`,
        );
        return {
          message:
            'Błąd! Czas aktywacji konta upłynął, zarejestruj się ponownie, używając tego samego e-maila',
        };
      }
    } else {
      return { message: 'Błąd! Nie ma takiego loginu' };
    }
  }

  async sendEmailForgotPassword(username: string) {
    const userExist = await this.usersRepository.findBy({
      email: username,
    });

    if (userExist.length > 0) {
      try {
        this.mailerService.sendMail({
          to: `${username}`,
          from: `"Adminisjtracja serwisu" <kacper4312@op.pl>`,
          subject: 'Link do resetu hasła',
          text: `Witaj, ${username} \n Kliknij w link, aby zresetować hasło: http://localhost:3000/zmiana/${username}`,
          html: `Witaj, ${username} \n Kliknij w link, aby zresetować hasło: <a href="http://localhost:3000/zmiana/${username}"> LINK </a>`,
        });
        return { message: 'Wysłano maila' };
      } catch (e) {
        return { message: e };
      }
    } else {
      return { message: 'Konto nie istnieje' };
    }
  }

  async changePassword(registerData: registerType) {
    const { email } = registerData,
      { password } = registerData;

    if (password.length < 6) {
      return { message: 'Błąd! Twoje hasło jest za krótkie' };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    this.usersRepository.query(
      `UPDATE users SET password='${hashPassword}' WHERE email='${email}' `,
    );
    return { message: 'Zmieniono hasło' };
  }
}
