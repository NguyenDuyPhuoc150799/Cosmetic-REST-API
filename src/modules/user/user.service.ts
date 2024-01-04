import { UserOutput } from './dto/user.output';
import { UpdateUserInput } from './dto/update-user.input';
import { IPayload } from './../../interface/payload';
import { UserFindAllParam } from './dto/user-find-all.input';
import { UserEntity } from './../../entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './type/user.type';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { Role } from 'src/interface/role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async find(id: string): Promise<User> {
    return await this.userEntity.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userEntity
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where(`user.username='${username}'`)
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  async findAll({
    offset,
    limit,
    searchText,
    userType,
  }: UserFindAllParam): Promise<UserOutput> {
    const findOption: FindManyOptions<UserEntity> = {};
    if (offset) findOption.skip = offset;
    if (limit) findOption.take = limit;

    findOption.where = (qb: SelectQueryBuilder<UserEntity>) => {
      if (searchText) {
        qb.where({
          username: Like(`%${searchText}%`),
        })
          .orWhere(`${qb.alias}.name like '%${searchText}%'`)
          .orWhere(`${qb.alias}.address like '%${searchText}'`)
          .orWhere(`${qb.alias}.phone like '%${searchText}%'`)
          .orWhere(`${qb.alias}.email like '%${searchText}%'`);
      }
      if (userType)
        qb.andWhere(`${qb.alias}.userType=:userType`, {
          userType,
        });
    };
    findOption.order = {
      id: 'ASC',
    };
    const result = await this.userEntity.findAndCount(findOption);
    return {
      users: result[0],
      count: result[1],
    };
  }

  async create(
    userPayload: IPayload,
    userInput: CreateUserInput,
  ): Promise<User> {
    try {
      const user = await this.userEntity.findOne({
        username: userInput.username,
      });
      //console.log(userPayload.role);
      //if (userPayload.role === Role.customer)
      // userInput.userType = Role.customer;
      if (user) throw new BadRequestException('User is exist');
      return await this.userEntity.save(userInput);
    } catch (err) {
      throw err;
    }
  }

  async update(
    userPayload: IPayload,
    userInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userEntity.findOne(userInput.id);
    console.log(user, userInput);
    if (!user) throw new NotFoundException('User isnt exists');
    switch (userPayload.role) {
      case Role.admin:
        break;
      case Role.customer:
        if (
          userPayload.username !== user.username ||
          userInput.userType !== Role.customer
        )
          throw new ForbiddenException();
        break;
      case Role.employee:
        if (
          userPayload.username !== user.username ||
          userInput.userType !== Role.employee
        )
          throw new ForbiddenException();
        break;
    }

    return await this.userEntity.save(userInput);
  }

  async delete(userPayload: IPayload, id: string): Promise<boolean> {
    const user = await this.userEntity.findOne(id);
    if (!user) throw new NotFoundException();
    await this.userEntity.softDelete(id);
    return true;
  }
}
