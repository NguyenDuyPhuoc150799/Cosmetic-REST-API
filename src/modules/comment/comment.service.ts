import { CommentFindAll } from './dto/comment-find-all.input';
import { ProductEntity } from './../../entity/product.entity';
import { UserEntity } from './../../entity/user.entity';
import { IPayload } from './../../interface/payload';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from './../../entity/comment.entity';
import { Comment } from './type/comment.type';
import { CreateComment } from './dto/create-comment.input';
import { Role } from '../../interface/role';
import { UpdateCommentInput } from './dto/update-comment.input';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentEntity: Repository<CommentEntity>,
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async find(
    userPayload: IPayload,
    commentFindAll: CommentFindAll,
  ): Promise<Comment[]> {
    const findOptions: FindManyOptions = {
      relations: ['user', 'product'],
    };

    findOptions.skip = commentFindAll.offset;
    findOptions.take = commentFindAll.limit;
    findOptions.order = {
      createdAt: 'DESC',
    };
    findOptions.where = (qb: SelectQueryBuilder<CommentEntity>) => {
      if (
        userPayload &&
        commentFindAll.userId &&
        userPayload.role === Role.admin
      )
        qb.andWhere(`${qb.alias}.user.id='${commentFindAll.userId}'`);
      if (commentFindAll.productId)
        qb.andWhere(`${qb.alias}.product.id='${commentFindAll.productId}'`);
    };
    return await this.commentEntity.find(findOptions);
  }

  async create(
    userPayload: IPayload,
    commentInput: CreateComment,
  ): Promise<Comment> {
    try {
      if (!userPayload.id) throw new BadRequestException();
      const user = await this.userEntity.findOne(userPayload.id);
      if (!user) throw new UnauthorizedException();
      const product = await this.productEntity.findOne(commentInput.productId);
      if (!product) throw new NotFoundException('product is not found');

      const comment = new Comment();
      comment.content = commentInput.content;
      comment.isShow = commentInput.isShow;
      comment.star = commentInput.star;
      comment.title = commentInput.title;
      comment.user = user;
      comment.product = product;

      return await this.commentEntity.save(comment);
    } catch (error) {
      throw error;
    }
  }

  async update(
    commentInput: UpdateCommentInput,
    userPayLoad: IPayload,
  ): Promise<Comment> {
    try {
      const comment = await this.commentEntity.findOne(commentInput.id, {
        relations: ['user'],
      });
      if (!comment) {
        throw new NotFoundException();
      }

      const user = await this.userEntity.findOne(userPayLoad.id);
      if (!user) throw new NotFoundException();

      if (user.id !== comment.user.id && user.userType !== Role.admin)
        throw new ForbiddenException();
      if (user.id === comment.user.id) {
        comment.content = commentInput.content;
        comment.isShow = commentInput.isShow;
        comment.star = commentInput.star;
        comment.title = commentInput.title;
      } else if (
        user.userType === Role.admin ||
        user.userType === Role.employee
      ) {
        comment.isShow = commentInput.isShow;
      } else {
        throw new ForbiddenException();
      }

      return await this.commentEntity.save(comment);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userPayLoad: IPayload): Promise<boolean> {
    const comment = await this.commentEntity.findOne({
      where: { id },
      relations: ['user'],
    });

    try {
      if (!comment) {
        throw new NotFoundException();
      }

      if (comment.user.id !== userPayLoad.id) {
        if (
          userPayLoad.role === Role.admin ||
          (userPayLoad.role === Role.employee &&
            comment.user.userType === Role.employee)
        ) {
          comment.isShow = false;
          return true;
        }
        throw new ForbiddenException();
      } else {
        await this.commentEntity.softDelete(id);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
