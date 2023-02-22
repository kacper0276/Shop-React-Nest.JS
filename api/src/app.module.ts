import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import Posts from './dtos/Posts.entity';
import { Users } from './dtos/Users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop-nest-react',
      entities: [Users, Posts],
      synchronize: true,
    }),
    AuthenticatedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
