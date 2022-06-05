import { ProducerEntity } from './../../entity/producer.entity';
import { CategoryEntity } from './../../entity/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './../../entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, ProducerEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
