import { OrderStatus } from './order-status.interface';
import { IPaymentType } from './payment-type.interface';
import { IUser } from './user.interface';
export interface IOrder {
  id: string;
  code: string;
  user: IUser;
  deliveryAddress?: string;
  deliveryPhone?: string;
  status: OrderStatus;
  paymentType: IPaymentType;
}
