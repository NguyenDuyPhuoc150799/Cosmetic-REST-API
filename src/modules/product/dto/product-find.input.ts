import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryFindModel } from './../../../interface/find-model';
export class ProductFindAll extends QueryFindModel {
  @ApiPropertyOptional({ required: false, nullable: true })
  category?: string;
  @ApiPropertyOptional({ required: false, nullable: true })
  producer?: string;
}
