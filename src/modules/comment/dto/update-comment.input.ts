import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateComment } from './create-comment.input';

export class UpdateCommentInput extends OmitType(CreateComment, ['productId']) {
  @ApiProperty()
  id: string;
}
