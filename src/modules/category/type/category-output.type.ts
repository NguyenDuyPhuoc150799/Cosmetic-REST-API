import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from './category.type';

export class CategoryOutput extends Category {
  @ApiPropertyOptional({ nullable: true })
  length: number;
}
