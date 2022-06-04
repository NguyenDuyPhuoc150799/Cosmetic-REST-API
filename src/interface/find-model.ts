import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilterModel {
  key: string;
  value: string;
}

export class SearchModel {
  text: string;

  @ApiPropertyOptional()
  onKey?: string[];
}

export class FindModel {
  @ApiPropertyOptional({ default: 0 })
  offset?: number;

  @ApiPropertyOptional({ default: 10 })
  limit?: number;

  @ApiPropertyOptional()
  search?: SearchModel;

  @ApiPropertyOptional()
  filter?: FilterModel[];
}

export class QueryFindModel {
  @ApiPropertyOptional({ default: 0, required: false })
  offset?: number;

  @ApiPropertyOptional({ default: 10, required: false })
  limit?: number;

  @ApiPropertyOptional({ required: false })
  searchText?: string;
}
