import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import Orders from './dtos/Orders.entity';
import Auction from './dtos/Auction.entity';
import Products from './dtos/ProductsType.entity';
import { Users } from './dtos/Users.entity';
import UsersPanelModule from './usersPanel/usersPanel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop-nest-react',
      entities: [Users, Auction, Orders, Products],
      synchronize: true,
    }),
    AuthenticatedModule,
    UsersPanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
