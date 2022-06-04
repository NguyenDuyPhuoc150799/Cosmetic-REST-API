import { ProductEntity } from './product.entity';
import { IProductImage } from './../interface/product-image.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProductImageMaster')
export class ProductImageEntity implements IProductImage {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column()
  image: string;
}
