import { Category } from './../../category/type/category.type';
import { Producer } from './../../producer/type/producer.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, Min } from 'class-validator';
import { IProduct } from '../../../interface/product.interface';

export class Product implements IProduct {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  size?: number;

  @IsHexColor()
  @ApiPropertyOptional()
  color?: string;

  @ApiPropertyOptional()
  description?: string;

  @Min(0)
  @ApiProperty()
  price: number;

  @Min(0)
  @ApiProperty()
  quantity: number;

  @ApiPropertyOptional()
  point?: number;

  @ApiPropertyOptional()
  detail?: string;

  @Min(0)
  @ApiPropertyOptional()
  promotion?: number;

  @ApiProperty()
  producer: Producer;

  @ApiProperty()
  categories: Category[];
}
