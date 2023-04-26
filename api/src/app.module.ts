import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import Orders from './dtos/Orders.entity';
import Auction from './dtos/Auction.entity';
import { Users } from './dtos/Users.entity';
import UsersPanelModule from './usersPanel/usersPanel.module';
import { RabatCode } from './dtos/RabatCode.entity';
import ProductsType from './dtos/ProductsType.entity';
import { AdminPanelModule } from './adminPanel/adminPanel.module';
import Slider from './dtos/Slider.entity';
import ProductsModule from './products/products.module';
import { ShoppingModule } from './shopping/shopping.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop-nest-react',
      entities: [Users, Auction, Orders, ProductsType, RabatCode, Slider],
      synchronize: true,
    }),
    AuthenticatedModule,
    UsersPanelModule,
    AdminPanelModule,
    ProductsModule,
    ShoppingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
