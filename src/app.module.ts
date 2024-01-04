import { ProductModule } from './modules/product/product.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { OrderModule } from './modules/order/order.module';
import { ProducerModule } from './modules/producer/producer.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc@ABC1',
      database: 'comesticDB',
      entities: ['dist/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ProductModule,
    CategoryModule,
    CommentModule,
    OrderModule,
    ProducerModule,
  ],
})
export class AppModule {}
