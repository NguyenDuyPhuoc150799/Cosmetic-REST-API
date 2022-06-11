import { IPaymentType } from 'src/interface/payment-type.interface';
import { User } from '../../user/type/user.type';
import { IOrder } from '../../../interface/order.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from 'src/interface/order-status.interface';

export class Order implements IOrder {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  user: User;

  @ApiPropertyOptional()
  deliveryAddress?: string;

  @ApiPropertyOptional()
  deliveryPhone?: string;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  paymentType: IPaymentType;
}
