import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryFindModel } from './../../../interface/find-model';
export class FilterDateFormat {
  format: string;
  value: string;
}
export class FindAllOrder extends QueryFindModel {
  @ApiPropertyOptional({
    description: `format: 'YYYY'\n, value: '2020' to filter by year
    format: 'MM/YYYY'\n, value: '09/2020' to filter by month
    format: 'DD/MM/YYYY'\n, value: '05/09/2020' to filter by date`,
    type: FilterDateFormat,
    required: false,
  })
  date?: {
    format: string;
    value: string;
  };
}
