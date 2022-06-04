import { IProduct } from './product.interface';
import { IOrder } from './order.interface';

export interface IOrderDetail {
  order: IOrder;
  product: IProduct;
  quantity: number;
  price: number;
  promotion: number;
}
