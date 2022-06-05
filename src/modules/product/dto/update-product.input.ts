import { ApiProperty } from '@nestjs/swagger';
import { CreateProductInput } from './create-product.input';

export class UpdateProductInput extends CreateProductInput {
  @ApiProperty()
  id: string;
}
