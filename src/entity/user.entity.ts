import { IUser } from './../interface/user.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/interface/role';
import { OrderEntity } from './order.entity';

@Entity('UserMaster')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true, length: 50 })
  username?: string;

  @Column({ nullable: true, length: 50, select: false })
  password?: string;

  @Column({ nullable: true })
  facebookId?: string;

  @Column()
  userType: Role;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true, type: 'date' })
  birthday?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: string;
}
