import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../interface/role';

export class UserFindAllParam {
  @ApiPropertyOptional({
    default: 0,
    required: false,
  })
  offset: number;

  @ApiProperty({
    default: 10,
    required: false,
    description: 'limit user',
  })
  limit: number;

  @ApiProperty({
    nullable: true,
    required: false,
    default: '',
  })
  searchText: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  userType: Role;
}
