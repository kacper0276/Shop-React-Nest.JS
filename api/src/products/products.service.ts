import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
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
}
