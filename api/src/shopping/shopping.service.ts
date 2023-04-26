import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Auction from 'src/dtos/Auction.entity';
import Orders from 'src/dtos/Orders.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,

    private readonly mailerService: MailerService,
  ) {}

  async confirmOrder(data: any) {
    const { deliveryType } = data,
      { useRabatCode } = data,
      { orderDetails } = data;

    let objectAddToOrders = {
      productName: ``,
      adres: `${data.deliveryAdres.adres}`,
      seller: ``,
      clientEmail: data.deliveryAdres.email,
      deliveryType: deliveryType,
      productQuantity: ``,
      productPrice: ``,
      date: new Date().toLocaleString('pl-PL'),
    };

    for (const element of JSON.parse(orderDetails)) {
      const orderElement = await this.auctionRepository.findBy({
        id: element.id,
      });

      objectAddToOrders.productName +=
        JSON.stringify(orderElement[0].name) + ', ';
      objectAddToOrders.productQuantity +=
        JSON.stringify(element.quentity) + ', ';
      objectAddToOrders.productPrice +=
        JSON.stringify(
          useRabatCode
            ? element.quentity *
                (orderElement[0].price -
                  orderElement[0].price * (useRabatCode / 100))
            : orderElement[0].price,
        ) + ', ';
      objectAddToOrders.seller += JSON.stringify(orderElement[0].seller) + ', ';

      if (orderElement[0].quentity - element.quentity === 0) {
        fs.unlinkSync(`../frontend/public/products/${orderElement[0].img}`);

        this.auctionRepository.delete({
          id: element.id,
        });
      } else if (orderElement[0].quentity - element.quentity > 0) {
        this.auctionRepository.query(
          `UPDATE auction SET quentity=${
            orderElement[0].quentity - element.quentity
          } WHERE id = ${element.id}`,
        );
      } else {
        throw new Error('Błąd');
      }
    }

    this.ordersRepository.save(objectAddToOrders);
    this.mailerService.sendMail({
      to: `${objectAddToOrders.clientEmail}`,
      from: `"Adminisjtracja serwisu" <kacper4312@op.pl>`,
      subject: 'Dziękujemy za złożenie zamówienia',
      text: `Witaj, ${data.deliveryAdres.name} ${data.deliveryAdres.lastName} \n Twoje zamówienie złożone dnia ${objectAddToOrders.date} niedługo zostanie wysłane, w niedalekim czasie wyślemy maila z linkiem do śledzenia statusu zamówienia. \n Pozdrawiamy`,
      html: `Witaj, ${data.deliveryAdres.name} ${data.deliveryAdres.lastName} \n Twoje zamówienie złożone dnia ${objectAddToOrders.date} niedługo zostanie wysłane, w niedalekim czasie wyślemy maila z linkiem do śledzenia statusu zamówienia. \n Pozdrawiamy`,
    });
    return { message: 'Wysłano' };
  }
}
