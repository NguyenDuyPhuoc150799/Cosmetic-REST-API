import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailInput {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;
}
