import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductsType from 'src/dtos/ProductsType.entity';
import { RabatCode } from 'src/dtos/RabatCode.entity';
import { Users } from 'src/dtos/Users.entity';
import { loginType } from 'src/types/loginType';
import { rabatCodeType } from 'src/types/rabatCodeType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { auctionType } from 'src/types/auctionType';
import Auction from 'src/dtos/Auction.entity';
import Slider from 'src/dtos/Slider.entity';
import * as fs from 'fs';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,

    @InjectRepository(ProductsType)
    private productsTypeRepository: Repository<ProductsType>,

    @InjectRepository(RabatCode)
    private rabatCodeRepository: Repository<RabatCode>,

    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(Slider)
    private sliderRepository: Repository<Slider>,
  ) {}

  // Rabat Code functions
  async addRabatCode(data: rabatCodeType) {
    const { rabatCode } = data,
      { codeExpiredDate } = data,
      { rabatValue } = data;

    const dateAfterModify = JSON.stringify(codeExpiredDate).replace('T', ' ');

    const date = new Date();
    let month: string, day: string;

    date.getMonth() < 10
      ? (month = `0${date.getMonth() + 1}`)
      : (month = `${date.getMonth() + 1}`);

    date.getDay() < 10
      ? (day = `0${date.getDate()}`)
      : (month = `${date.getDate()}`);

    const actualDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;

    if (actualDate > JSON.parse(dateAfterModify)) {
      return { message: 'Błąd! Nie dodawaj daty, która minęła' };
    } else if (rabatValue > 100 || rabatValue < 1) {
      return {
        message: 'Błąd! Wartość musi być mniejsza od 100 i większa od 0',
      };
    } else {
      const objectReadyToInsert = {
        code: rabatCode,
        codeExpired: JSON.parse(dateAfterModify),
        valueRabat: rabatValue,
      };

      await this.rabatCodeRepository.save(objectReadyToInsert);
      return { message: 'Dodano rabat do bazy danych' };
    }
  }

  async getAllRabatCode() {
    const allCodes = await this.rabatCodeRepository.find();

    return { allCodes: allCodes };
  }

  async getDetailsOneRabatCode(id: number) {
    const oneCodeDetails = await this.rabatCodeRepository.findBy({
      id: id,
    });

    return { codeDetails: oneCodeDetails };
  }

  async editCodeDetails(data: rabatCodeType) {
    const { rabatCode } = data,
      { codeExpiredDate } = data,
      { rabatValue } = data,
      { id } = data;

    const dateAfterModify = JSON.stringify(codeExpiredDate).replace('T', ' ');

    const date = new Date();
    let month: string, day: string;

    date.getMonth() < 10
      ? (month = `0${date.getMonth() + 1}`)
      : (month = `${date.getMonth() + 1}`);

    date.getDay() < 10
      ? (day = `0${date.getDate()}`)
      : (month = `${date.getDate()}`);

    const actualDate = `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;

    if (actualDate > JSON.parse(dateAfterModify)) {
      return { message: 'Błąd! Nie dodawaj daty, która minęła' };
    } else if (rabatValue > 100 || rabatValue < 1) {
      return {
        message: 'Błąd! Wartość musi być mniejsza od 100 i większa od 0',
      };
    } else {
      this.rabatCodeRepository.query(
        `UPDATE rabat_code SET code='${rabatCode}', valueRabat=${rabatValue}, codeExpired='${JSON.parse(
          dateAfterModify,
        )}' WHERE id=${id}`,
      );

      return { message: 'Zmieniono dane' };
    }
  }

  async deleteRabatCode(id: number) {
    this.rabatCodeRepository.delete({
      id: id,
    });
  }

  // Users functions
  async getAllUsers() {
    const allUsersList = await this.usersRepository.find();

    return { allUsersList };
  }

  async changeUserData(data: loginType, id: number) {
    let { email } = data,
      { password } = data,
      { isActive } = data,
      { userType } = data,
      idNumber = id,
      userActualDate = await this.usersRepository.findBy({
        id: idNumber,
      });
    const salt = bcrypt.genSaltSync(10);

    const emailChange = Boolean(email),
      passwordChange = Boolean(password),
      isActiveChange = isActive === null ? false : true,
      userTypeChange = userType === null ? false : true;

    if (email.includes('@') === false && emailChange) {
      return { message: 'Błąd! Twój login nie jest emailem' };
    }

    if (password.length < 6 && passwordChange) {
      return { message: 'Błąd! Twoje hasło jest za krótkie' };
    }

    email = emailChange ? email : userActualDate[0].email;
    password = passwordChange
      ? await bcrypt.hashSync(password, salt)
      : userActualDate[0].password;
    isActive = isActiveChange ? isActive : userActualDate[0].isActive;
    userType = userTypeChange ? userType : userActualDate[0].userType;

    console.log(email, password, isActive, userType);

    this.usersRepository.query(
      `UPDATE users SET email='${email}', password='${password}', isActive=${isActive}, userType='${userType}' WHERE id=${idNumber} `,
    );

    return { message: 'Poprawnie zmieniono dane użytkownika' };
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({
      id: id,
    });

    return { message: 'Usunięto użytkownika' };
  }

  // Auction type function
  async addAuctionType(data: auctionType) {
    const { name } = data;

    if (name.length > 0) {
      try {
        this.productsTypeRepository.save({ name: name });
        return { message: 'Poprawnie dodano' };
      } catch (e) {
        throw new Error(e);
      }
    } else {
      return { message: 'Błąd, nie może być pusta wartość' };
    }
  }

  async getAllTypesProducts() {
    const data = await this.productsTypeRepository.find();

    return { data: data };
  }

  async deleteAuctionType(name: string) {
    const typeExpist = await this.productsTypeRepository.findBy({
      name: name,
    });

    if (typeExpist.length > 0) {
      this.auctionRepository.query(
        `DELETE FROM auction WHERE productType='${name}'`,
      );
      this.productsTypeRepository.query(
        `DELETE FROM products_type WHERE name='${name}'`,
      );
      return { message: 'Poprawnie usunięto' };
    } else {
      return { message: 'Błąd! Nie ma takiego typu aukcji' };
    }
  }

  async editAuctionType(data: auctionType) {
    const { id } = data,
      { name } = data;

    const oldName = await this.productsTypeRepository.findBy({ id: id });

    try {
      this.productsTypeRepository.query(
        `UPDATE products_type SET name='${name}' WHERE id=${id}`,
      );

      this.auctionRepository.query(
        `UPDATE auction SET productType='${name}' WHERE productType='${oldName[0].name}'`,
      );

      return { message: 'Zmieniono' };
    } catch (e) {
      throw new Error('Błąd');
    }
  }

  // Slider panel
  async addPhotoSlider(file: any) {
    const { filename } = file;

    const objectToSave = {
      namePhoto: filename,
    };

    try {
      this.sliderRepository.save(objectToSave);
      return { message: 'Dodano zdjęcie' };
    } catch (e) {
      return { message: 'Błąd' };
    }
  }

  async getAllPhotosInSlider() {
    const allPhotos = await this.sliderRepository.find();

    return { photos: allPhotos };
  }

  async deletePhotoSlider(id: number) {
    const photoDetails = await this.sliderRepository.findBy({
      id: id,
    });

    if (photoDetails.length < 1) {
      return { message: 'Błąd! Brak zdjęcia o podanym id.' };
    } else {
      fs.unlinkSync(`../frontend/public/slider/${photoDetails[0].namePhoto}`);
      this.sliderRepository.delete({
        id: id,
      });

      return { message: 'Poprawnie usunięto' };
    }
  }
}
