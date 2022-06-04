import { ApiProperty } from '@nestjs/swagger';
import { User } from './../type/user.type';
export class UserOutput {
  @ApiProperty()
  users: User[];

  @ApiProperty()
  count: number;
}
