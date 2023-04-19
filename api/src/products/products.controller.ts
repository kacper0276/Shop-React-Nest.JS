import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/allproductslist')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('/getproducts/:type')
  async getProducts(@Param('type') type: string) {
    return this.productsService.getProducts(type);
  }

  @Get('/getproductdetails/:id')
  async getProductsDetails(@Param('id') id: number) {
    return this.productsService.getProductDetails(id);
  }

  @Post('/productsfromshoppingcard')
  async productsFromShoppingCard(@Body() data: any) {
    return this.productsService.productsFromShoppingCard(data);
  }
}
