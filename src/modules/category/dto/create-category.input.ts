import { OmitType, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from './../type/category.type';
export class CreateCategory extends OmitType(Category, ['id', 'parent']) {
  @ApiPropertyOptional()
  parentId: string;
}
