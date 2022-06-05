import { Comment } from './../type/comment.type';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateComment extends OmitType(Comment, [
  'id',
  'user',
  'product',
]) {
  @ApiProperty()
  productId: string;
}
