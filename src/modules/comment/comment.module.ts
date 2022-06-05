import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './../../entity/comment.entity';
import { ProductEntity } from './../../entity/product.entity';
import { UserEntity } from './../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity, CommentEntity]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
