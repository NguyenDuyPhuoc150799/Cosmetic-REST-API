import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IComment {
  id: string;
  user: IUser;
  product: IProduct;
  title: string;
  content: string;
  star: number;
  isShow: boolean;
}
