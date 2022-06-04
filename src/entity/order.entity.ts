import { OrderDetailEntity } from './order-detail.entity';
import { IPaymentType } from '../interface/payment-type.interface';
import { UserEntity } from './user.entity';
import { IOrder } from './../interface/order.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from 'src/interface/order-status.interface';

@Entity('OrderMaster')
export class OrderEntity implements IOrder {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true, generated: 'uuid' })
  code: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ nullable: true })
  deliveryAddress?: string;

  @Column({ nullable: true })
  deliveryPhone?: string;

  @Column()
  status: OrderStatus;

  @Column()
  paymentType: IPaymentType;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
