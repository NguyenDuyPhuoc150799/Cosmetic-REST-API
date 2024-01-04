import { IsCustomDateString } from './../../../decorator/is-custom-data.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { Role } from '../../../interface/role';
import { IUser } from '../../../interface/user.interface';

export class User implements IUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  facebookId?: string;

  @ApiProperty()
  userType: Role;

  @ApiProperty()
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsPhoneNumber('vi')
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @ApiProperty()
  address?: string;

  @IsCustomDateString({
    message: 'The birthday must be mm/dd/yyyy',
  })
  @IsOptional()
  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  isActive: boolean;
}
