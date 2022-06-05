import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Order } from './../model/order.model';
import { OrderDetailInput } from './order-detail.input';

export class CreateOrderInput extends OmitType(Order, [
  'id',
  'status',
  'user',
  'code',
]) {
  @ApiProperty({ type: [OrderDetailInput] })
  orderDetail: OrderDetailInput[];
}
