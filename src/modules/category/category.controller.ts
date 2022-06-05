import { UpdateCategoryInput } from './dto/update-category.input';
import { CreateCategory } from './dto/create-category.input';
import { CategoryService } from './category.service';
import { Category } from './type/category.type';
import { Role } from './../../interface/role';
import { JwtAuthGuard } from './../../guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorator/role.decorator';
import { CategoryOutput } from './type/category-output.type';

@Controller({ path: 'category' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryOutput[]> {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Post()
  async create(@Body() createCategory: CreateCategory): Promise<Category> {
    return this.categoryService.create(createCategory);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Put()
  async update(@Body() categoryInput: UpdateCategoryInput): Promise<Category> {
    return this.categoryService.update(categoryInput);
  }

  @Delete()
  @Roles(Role.admin)
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.categoryService.delete(id);
  }
}
