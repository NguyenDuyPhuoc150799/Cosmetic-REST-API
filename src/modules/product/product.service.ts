import { Product } from './type/product';
import { ProducerEntity } from './../../entity/producer.entity';
import { CategoryEntity } from './../../entity/category.entity';
import { ProductEntity } from './../../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { ProductFindAll } from './dto/product-find.input';
import { ProductOuput } from './dto/product.output';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
    @InjectRepository(ProducerEntity)
    private readonly producerEntity: Repository<ProducerEntity>,
  ) {}

  async findById(id: string): Promise<Product> {
    return await this.productEntity.findOne(id);
  }

  async findAll({
    limit,
    offset,
    searchText,
    category,
    producer,
  }: ProductFindAll): Promise<ProductOuput> {
    try {
      const findOptions: FindManyOptions = {
        relations: ['producer', 'categories'],
      };

      if (offset) findOptions.skip = offset;
      if (limit) findOptions.take = limit;

      findOptions.order = {
        createdAt: 'DESC',
      };

      findOptions.where = (qb: SelectQueryBuilder<ProductEntity>) => {
        if (searchText) qb.where(`${qb.alias}.name like '%${searchText}%'`);
        if (producer) qb.andWhere(`${qb.alias}.producer.id = '${producer}'`);
      };

      const result = await this.productEntity.findAndCount(findOptions);
      return { products: result[0], count: result[1] };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async create(productInput: CreateProductInput): Promise<Product> {
    try {
      if (!productInput.categoryIds.length) {
        throw new NotFoundException('Category not found');
      }
      const categories = await this.categoryEntity.findByIds(
        productInput.categoryIds,
      );
      if (
        !categories.length ||
        categories.length !== productInput.categoryIds.length
      ) {
        throw new NotFoundException('Category not found');
      }
      const producer = await this.producerEntity.findOne(
        productInput.producerId,
      );
      if (!producer) {
        throw new NotFoundException('Producer not found');
      }
      const product = new Product();
      product.code = productInput.code;
      product.name = productInput.name;
      product.size = productInput.size;
      product.color = productInput.color;
      product.description = productInput.description;
      product.price = productInput.price;
      product.quantity = productInput.quantity;
      product.point = productInput.point;
      product.detail = productInput.detail;
      product.promotion = productInput.promotion;
      product.categories = categories;
      product.producer = producer;

      return await this.productEntity.save(product);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createMany(productInputs: CreateProductInput[]): Promise<Product[]> {
    try {
      const products: Product[] = [];
      for (let i = 0; i < productInputs.length; i++) {
        if (!productInputs[i].categoryIds.length)
          throw new NotFoundException(`Category not found`);
        const categories = await this.categoryEntity.findByIds(
          productInputs[i].categoryIds,
        );
        if (
          !categories.length ||
          categories.length !== productInputs[i].categoryIds.length
        )
          throw new NotFoundException(`Category not found`);

        const producer = await this.producerEntity.findOne(
          productInputs[i].producerId,
        );
        if (!producer)
          throw new NotFoundException(
            `Producer ${productInputs[i].producerId} not found`,
          );

        const product = new Product();

        product.code = productInputs[i].code;
        product.name = productInputs[i].name;
        product.size = productInputs[i].size;
        product.color = productInputs[i].color;
        product.description = productInputs[i].description;
        product.price = productInputs[i].price;
        product.quantity = productInputs[i].quantity;
        product.point = productInputs[i].point;
        product.detail = productInputs[i].detail;
        product.promotion = productInputs[i].promotion;
        product.categories = categories;
        product.producer = producer;

        products.push(product);
      }
      return await this.productEntity.save(products);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async update(productInput: UpdateProductInput): Promise<Product> {
    try {
      const product = await this.productEntity.findOne(productInput.id, {
        relations: ['categories', 'producer'],
      });

      if (!product) throw new NotFoundException('Product not found');

      product.code = productInput.code;
      product.name = productInput.name;
      product.size = productInput.size;
      product.color = productInput.color;
      product.description = productInput.description;
      product.price = productInput.price;
      product.quantity = productInput.quantity;
      product.point = productInput.point;
      product.detail = productInput.detail;
      product.promotion = productInput.promotion;
      if (product.producer.id !== productInput.producerId) {
        const producer = await this.producerEntity.findOne(
          productInput.producerId,
        );
        if (!producer) throw new NotFoundException('Producer not found');
        product.producer = producer;
      }
      const categories = await this.categoryEntity.findByIds(
        productInput.categoryIds,
      );
      if (categories.length !== productInput.categoryIds.length)
        throw new NotFoundException('Category not found');
      return await this.productEntity.save(product);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const product = await this.productEntity.findOne(id);
      if (!product) throw new NotFoundException();
      await this.productEntity.softRemove(product);
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
