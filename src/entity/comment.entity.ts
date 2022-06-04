import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { IComment } from './../interface/comment.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CommentMaster')
export class CommentEntity implements IComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, {})
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ProductEntity, {})
  @JoinColumn()
  @ManyToOne((type) => ProductEntity)
  product: ProductEntity;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  star: number;

  @Column()
  isShow: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
