import { IOrder } from 'src/interface/order.interface';
import { IProduct } from 'src/interface/product.interface';
import { IOrderDetail } from './../../../interface/order-detail.interface';

export class OrderDetail implements IOrderDetail {
  order: IOrder;
  product: IProduct;
  quantity: number;
  promotion: number;
  price: number;
}
