import { UserOutput } from './dto/user.output';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from './../../guard/jwt-auth.guard';
import { IPayload } from './../../interface/payload';
import { UserPayload } from './../../decorator/user-payload.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { User } from './type/user.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../../interface/role';
import { Roles } from '../../decorator/role.decorator';
import { UserFindAllParam } from './dto/user-find-all.input';

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get()
  async findAll(@Query() param: UserFindAllParam): Promise<UserOutput> {
    return this.userService.findAll(param);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.customer, Role.admin)
  @Post()
  async create(
    @UserPayload() userPayload: IPayload,
    @Body() createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(userPayload, createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @UserPayload() userPayload: IPayload,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(userPayload, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  async delete(
    @UserPayload() userPayload: IPayload,
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.userService.delete(userPayload, id);
  }
}
