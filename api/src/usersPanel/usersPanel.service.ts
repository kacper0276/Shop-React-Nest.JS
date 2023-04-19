import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/dtos/Users.entity';
import { loginType } from 'src/types/loginType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { userAuctionType } from 'src/types/userAuctionType';
import * as fs from 'fs';
import Auction from 'src/dtos/Auction.entity';

@Injectable()
export default class UsersPanelService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,

    @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
  ) {}

  // Edit user data
  async editUserData(username: string, newData: loginType) {
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

  // User auctions
  async addAuction(file: any, data: userAuctionType) {
    const { filename } = file;

    if (
      data.description.trim() === '' ||
      data.name.trim() === '' ||
      data.quentity <= 0 ||
      data.price < 0 ||
      data.seller.trim() === '' ||
      data.productType.trim() === ''
    ) {
      fs.unlinkSync(`../frontend/public/products/${filename}`);
      return { message: 'Błąd! Sprawdź poprawność danych' };
    }
    const newObject = {
      name: data.name,
      price: data.price,
      quentity: data.quentity,
      description: data.description,
      img: filename,
      seller: data.seller,
      productType: data.productType,
    };

    this.auctionRepository.save(newObject);
    return {
      message:
        'Poprawnie dodano aukcje! Za moment zostaniesz przekierowany do strony głównej',
    };
  }

  async getAllUserAuction(username: string) {
    const userAuctions = await this.auctionRepository.findBy({
      seller: username,
    });

    return { auctions: userAuctions };
  }

  async deleteAuction(id: number) {
    const dataDeletedAuction = await this.auctionRepository.findBy({
      id: id,
    });

    if (dataDeletedAuction.length > 0) {
      try {
        fs.unlinkSync(
          `../frontend/public/products/${dataDeletedAuction[0].img}`,
        );
        this.auctionRepository.delete({
          id: id,
        });

        return { message: 'Poprawnie usunięto!' };
      } catch (e) {
        throw new Error(e);
      }
    } else {
      return { message: 'Błąd! Nie ma aukcji o podanym id' };
    }
  }
}
