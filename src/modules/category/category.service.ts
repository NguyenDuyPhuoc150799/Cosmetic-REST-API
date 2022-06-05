import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryEntity } from './../../entity/category.entity';
import { CreateCategory } from './dto/create-category.input';
import { Category } from './type/category.type';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryOutput } from './type/category-output.type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryOutput[]> {
    try {
      return (
        await this.categoryEntity.find({
          relations: ['parent', 'products'],
        })
      ).map((item) => {
        return {
          ...item,
          length: item.products?.length,
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async create(categoryInput: CreateCategory): Promise<Category> {
    try {
      let parentCategory;
      if (categoryInput.parentId)
        parentCategory = await this.categoryEntity.findOne(
          categoryInput.parentId,
        );

      const category = new Category();
      category.name = categoryInput.name;
      category.description = categoryInput.description;
      category.isShowOnSite = categoryInput.isShowOnSite;
      if (parentCategory) category.parent = parentCategory;

      return await this.categoryEntity.save(category);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(categoryInput: UpdateCategoryInput): Promise<Category> {
    try {
      const category = await this.categoryEntity.findOne(categoryInput.id);
      if (!category) throw new NotFoundException("Category isn't exists!");

      const parentCategory = await this.categoryEntity.findOne(
        categoryInput.parentId,
      );
      if (parentCategory) category.parent = parentCategory;
      category.name = categoryInput.name;
      category.description = categoryInput.description;
      category.isShowOnSite = categoryInput.isShowOnSite;
      return await this.categoryEntity.save(category);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const category = await this.categoryEntity.findOne(id, {
        relations: ['products'],
      });
      if (!category) throw new NotFoundException("Category isn't exist");
      if (category.products.length)
        throw new BadRequestException(
          "Can't delete this category, because product use this category",
        );
      return !!(await this.categoryEntity.delete(id)).affected;
    } catch (err) {
      console.log(err);
      if (err.message.includes("column 'parentId'"))
        throw new BadRequestException('this category is a parent of other');
      throw err;
    }
  }
}
