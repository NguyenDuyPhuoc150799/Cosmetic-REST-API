import { CommentFindAll } from './dto/comment-find-all.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { Roles } from '../../decorator/role.decorator';
import { UserPayload } from '../../decorator/user-payload.decorator';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { IPayload } from '../../interface/payload';
import { Role } from '../../interface/role';

import { CommentService } from './comment.service';
import { CreateComment } from './dto/create-comment.input';
import { Comment } from './type/comment.type';

@Controller({ path: 'comment' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async find(
    @UserPayload() userPayload: IPayload,
    @Query() commentFindAll: CommentFindAll,
  ) {
    return this.commentService.find(userPayload, commentFindAll);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee, Role.customer)
  @Post()
  async create(
    @UserPayload() userPayload: IPayload,
    @Body() comment: CreateComment,
  ): Promise<Comment> {
    return this.commentService.create(userPayload, comment);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee, Role.customer)
  @Put()
  async update(
    @UserPayload() userPayload: IPayload,
    @Body() comment: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentService.update(comment, userPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.customer, Role.employee)
  @Delete()
  async delete(
    @UserPayload() userPayload: IPayload,
    @Query('id') id: string,
  ): Promise<boolean> {
    return this.commentService.delete(id, userPayload);
  }
}
