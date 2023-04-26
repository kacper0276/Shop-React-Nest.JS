import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingService } from './shopping.service';

@Controller('shopping')
export class ShoppingController {
  constructor(private shoppingService: ShoppingService) {}

  @Post('/orderconfirm')
  async confirmOrder(@Body() data: any) {
    return await this.shoppingService.confirmOrder(data);
  }
}
