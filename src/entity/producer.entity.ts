import { ProductEntity } from './product.entity';
import { IProducer } from './../interface/producer.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ProducerMaster')
export class ProducerEntity implements IProducer {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ProductEntity, (product) => product.producer)
  products: ProductEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: string;
}
