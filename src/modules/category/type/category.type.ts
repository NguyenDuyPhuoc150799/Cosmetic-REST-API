import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICategory } from 'src/interface/category.interface';

export class Category implements ICategory {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  parent?: ICategory;

  @ApiPropertyOptional()
  isShowOnSite: boolean;
}
