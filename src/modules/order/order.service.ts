import { FindAllOrder } from './dto/find-all-order.input';
import { OrderDetailEntity } from './../../entity/order-detail.entity';
import { OrderDetail } from './model/order-detail.model';
import { ProductEntity } from './../../entity/product.entity';
import { UserEntity } from './../../entity/user.entity';
import { IPayload } from 'src/interface/payload';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './model/order.model';
import { OrderEntity } from './../../entity/order.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  getManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Role } from 'src/interface/role';
import { OrderStatus } from 'src/interface/order-status.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailEntity: Repository<OrderDetailEntity>,
  ) {}

  async findOne(user: IPayload, id: string) {
    return await this.orderEntity
      .createQueryBuilder('order')
      .where(`order.id='${id}'`)
      .innerJoin('order.orderDetails', 'orderDetail')
      .innerJoin('orderDetail.product', 'product')
      .getMany();
  }

  async findAll(
    user: IPayload,
    { searchText, offset, limit, date }: FindAllOrder,
  ): Promise<Order[]> {
    try {
      const findOptions: FindManyOptions = {
        relations: ['user'],
      };
      if (offset) findOptions.skip = offset;
      if (limit) findOptions.take = limit;
      findOptions.order = {
        createdAt: 'DESC',
      };
      if (user.role === Role.customer) {
        findOptions.where = (qb: SelectQueryBuilder<OrderEntity>) => {
          qb.where(`${qb.alias}.user.id=${user.id}`);
          if (searchText) {
            qb.andWhere(`${qb.alias}.code=${searchText}`);
          }
          if (date) {
            switch (date.format) {
              case 'YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'YYYY')= TO_DATE('${date.value}', 'YYYY')`,
                );
                break;
              case 'MM/YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'MM/YYYY')= TO_DATE('${date.value}', 'MM/YYYY')`,
                );
                break;
              case 'DD/MM/YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'DD/MM/YYYY')= TO_DATE('${date.value}', 'DD/MM/YYYY')`,
                );
                break;
            }
          }
        };
      } else {
        findOptions.where = (qb: SelectQueryBuilder<OrderEntity>) => {
          if (searchText) {
            qb.andWhere(`${qb.alias}.code=${searchText}`);
          }
          if (date) {
            switch (date.format) {
              case 'YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'YYYY')= TO_DATE('${date.value}', 'YYYY')`,
                );
                break;
              case 'MM/YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'MM/YYYY')= TO_DATE('${date.value}', 'MM/YYYY')`,
                );
                break;
              case 'DD/MM/YYYY':
                qb.andWhere(
                  `DATE(${qb.alias}.createdAt, 'DD/MM/YYYY')= TO_DATE('${date.value}', 'DD/MM/YYYY')`,
                );
                break;
            }
          }
        };
      }
      return await this.orderEntity.find(findOptions);
    } catch (err) {
      throw err;
    }
  }

  async create(
    userPayload: IPayload,
    createOrder: CreateOrderInput,
  ): Promise<Order> {
    try {
      const user = await this.userEntity.findOne(userPayload.id);
      if (!user) {
        throw new UnauthorizedException();
      }

      const orderMap = new Map();
      createOrder.orderDetail.forEach((item) =>
        orderMap.set(item.productId, item.quantity),
      );

      const products = await this.productEntity.findByIds(
        createOrder.orderDetail.map((item) => item.productId),
      );

      if (products.length !== createOrder.orderDetail.length)
        throw new NotFoundException('Product not found');
      let orderResult = null;
      getManager().transaction(async (transactionManager) => {
        const order = new Order();
        order.paymentType = createOrder.paymentType;
        order.deliveryAddress = createOrder.deliveryAddress;
        order.deliveryPhone = createOrder.deliveryPhone;
        order.status = OrderStatus.pending;
        order.user = user;

        orderResult = await transactionManager.save(order);

        for (let i = 0; i < products.length; i++) {
          const orderDetail = new OrderDetail();
          orderDetail.order = orderResult;
          orderDetail.product = products[i];
          orderDetail.price = products[i].price;
          orderDetail.promotion = products[i].promotion;
          orderDetail.quantity = orderMap.get(products[i].id);
          await transactionManager.save(orderDetail);
        }
      });

      return orderResult;
    } catch (err) {
      throw err;
    }
  }

  async changeStatus(user: IPayload, id: string, status: OrderStatus) {
    try {
      if (user.role === Role.customer && status !== OrderStatus.cancel) {
        throw new ForbiddenException();
      }
      const order = await this.orderEntity.findOne(id, {
        relations: ['user'],
      });
      if (!order) {
        throw new BadRequestException('order not found');
      }

      if (user.role === Role.customer && user.id !== order.user.id) {
        throw new ForbiddenException();
      }

      order.status = status;

      return await this.orderEntity.save(order);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const order = await this.orderEntity.findOne(id);
      if (!order) throw new NotFoundException('Order not found');
      await this.orderEntity.softRemove(order);
      return true;
    } catch (err) {
      throw err;
    }
  }
}
