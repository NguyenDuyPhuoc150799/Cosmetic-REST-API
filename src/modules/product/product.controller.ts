import { Role } from 'src/interface/role';
import { JwtAuthGuard } from './../../guard/jwt-auth.guard';
import { Product } from './type/product';
import { CreateProductInput } from './dto/create-product.input';
import { ProductOuput } from './dto/product.output';
import { ProductFindAll } from './dto/product-find.input';
import { ProductService } from './product.service';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { ApiBody } from '@nestjs/swagger';
import { UpdateProductInput } from './dto/update-product.input';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get(@Query() productFindAll: ProductFindAll): Promise<ProductOuput> {
    return this.productService.findAll(productFindAll);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.customer)
  @Post()
  async create(@Body() productInput: CreateProductInput): Promise<Product> {
    return this.productService.create(productInput);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Post('/create-many')
  @ApiBody({ type: [CreateProductInput] })
  async createMany(
    @Body() productInputs: CreateProductInput[],
  ): Promise<Product[]> {
    return this.productService.createMany(productInputs);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Put()
  async update(@Body() productInput: UpdateProductInput): Promise<Product> {
    return this.productService.update(productInput);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Delete()
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
