import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Orders from 'src/dtos/Orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerPanelService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}

  async getOrdersToDo() {
    const data = await this.ordersRepository.findBy({
      status: false,
      startCompleted: false,
    });

    return { products: data };
  }

  async getOrdersInProgress() {
    const products = await this.ordersRepository.findBy({
      startCompleted: true,
      status: false,
    });

    return { data: products };
  }

  async getCompletedOrders() {
    const products = await this.ordersRepository.findBy({
      status: true,
    });

    return { data: products };
  }
}
