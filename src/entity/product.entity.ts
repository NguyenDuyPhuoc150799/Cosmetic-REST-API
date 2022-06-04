import { IProduct } from './../interface/product.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProducerEntity } from './producer.entity';

@Entity('ProductMaster')
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  size?: number;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ nullable: true })
  point?: number;

  @Column({ nullable: true })
  detail?: string;

  @Column({ nullable: true })
  promotion?: number;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne(() => ProducerEntity, (producer) => producer.products)
  @JoinColumn()
  producer: ProducerEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: string;
}
