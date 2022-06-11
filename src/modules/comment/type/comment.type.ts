import { IProduct } from './../../../interface/product.interface';
import { IUser } from './../../../interface/user.interface';
import { IComment } from './../../../interface/comment.interface';
import { ApiProperty } from '@nestjs/swagger';
export class Comment implements IComment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: IUser;

  @ApiProperty()
  product: IProduct;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  star: number;

  @ApiProperty()
  isShow: boolean;
}
