import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';
import { RabatCode } from 'src/dtos/RabatCode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(RabatCode)
    private rabatCodeRepository: Repository<RabatCode>,
  ) {}

  async getAllProducts() {
    const allProducts = await this.auctionRepository.find();

    return { allProducts: allProducts };
  }

  async getProducts(type: string) {
    const productsList = await this.auctionRepository.findBy({
      productType: type,
    });

    return { productsList: productsList };
  }

  async getProductDetails(id: number) {
    const productDetails = await this.auctionRepository.findBy({
      id: id,
    });

    return { productDetails: productDetails };
  }

  async productsFromShoppingCard(data: any) {
    let productsDetailsFromShoppingCard = [];

    for (const el of data) {
      productsDetailsFromShoppingCard.push(
        await this.auctionRepository.findBy({
          id: el.id,
        }),
      );
    }

    return { productsDetails: productsDetailsFromShoppingCard };
  }

  async checkRabatCode(rabatCode: string) {
    const rabatCodeExist = await this.rabatCodeRepository.findBy({
      code: rabatCode,
    });
    let actualDate = new Date().toLocaleString('pl-PL').split('.');
    const hours = actualDate[2].split(',');
    actualDate[2] = hours[0];
    actualDate.reverse();

    if (
      rabatCodeExist.length > 0 &&
      Date.parse(rabatCodeExist[0].codeExpired + ':00') >
        Date.parse(actualDate.join('-') + hours[1])
    ) {
      return { message: rabatCodeExist[0].valueRabat };
    } else {
      return { message: 'Błąd! Taki kod nie istnieje' };
    }
  }
}
