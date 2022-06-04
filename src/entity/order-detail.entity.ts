import { ProductEntity } from './product.entity';
import { IOrderDetail } from './../interface/order-detail.interface';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('OrderDetailMaster')
export class OrderDetailEntity implements IOrderDetail {
  @ManyToOne(() => OrderEntity, { primary: true })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { primary: true })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column()
  promotion: number;

  @Column()
  price: number;
}
