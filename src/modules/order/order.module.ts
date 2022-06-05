import { OrderDetailEntity } from './../../entity/order-detail.entity';
import { ProductEntity } from './../../entity/product.entity';
import { UserEntity } from './../../entity/user.entity';
import { OrderService } from './order.service';
import { OrderEntity } from './../../entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      ProductEntity,
      OrderDetailEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
