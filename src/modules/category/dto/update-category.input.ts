import { ApiProperty } from '@nestjs/swagger';
import { CreateCategory } from './create-category.input';
export class UpdateCategoryInput extends CreateCategory {
  @ApiProperty()
  id: string;
}
