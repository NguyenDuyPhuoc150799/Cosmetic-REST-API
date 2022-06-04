import { OmitType } from '@nestjs/swagger';
import { User } from '../type/user.type';

export class UpdateUserInput extends OmitType(User, ['username']) {}
