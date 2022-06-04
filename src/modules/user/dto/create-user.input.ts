import { User } from './../type/user.type';
import { OmitType } from '@nestjs/swagger';

export class CreateUserInput extends OmitType(User, ['id', 'isActive']) {}
