import { Product } from './../type/product';
import { ApiProperty, OmitType } from '@nestjs/swagger';
export class CreateProductInput extends OmitType(Product, [
  'id',
  'categories',
  'producer',
]) {
  @ApiProperty()
  producerId: string;
  @ApiProperty()
  categoryIds: string[];
}
