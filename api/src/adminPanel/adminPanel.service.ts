import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductsType from 'src/dtos/ProductsType.entity';
import { RabatCode } from 'src/dtos/RabatCode.entity';
import { Users } from 'src/dtos/Users.entity';
import { rabatCodeType } from 'src/types/rabatCodeType';
import { Repository } from 'typeorm';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,

    @InjectRepository(ProductsType)
    private productsTypeRepository: Repository<ProductsType>,

    @InjectRepository(RabatCode)
    private rabatCodeRepository: Repository<RabatCode>,
  ) {}

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
      return { message: 'Nie dodawaj daty, która minęła' };
    } else if (rabatValue > 100 && rabatValue < 1) {
      return { message: 'Wartość musi być mniejsza od 100 i większa od 0' };
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
}
