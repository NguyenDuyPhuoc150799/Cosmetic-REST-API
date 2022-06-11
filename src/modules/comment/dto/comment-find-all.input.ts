import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryFindModel } from './../../../interface/find-model';
export class CommentFindAll extends QueryFindModel {
  @ApiPropertyOptional({ required: false })
  productId: string;

  @ApiPropertyOptional({ required: false })
  userId: string;
}
