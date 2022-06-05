import { UpdateProducerInput } from './dto/update-producer.input';
import { CreateProducerInput } from './dto/create-producer.input';
import { Producer } from './type/producer.type';
import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { Role } from './../../interface/role';
import { Roles } from './../../decorator/role.decorator';
import { JwtAuthGuard } from './../../guard/jwt-auth.guard';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async get(): Promise<Producer[]> {
    return this.producerService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Post()
  async create(@Body() producer: CreateProducerInput): Promise<Producer> {
    return this.producerService.create(producer);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Put()
  async update(@Body() producer: UpdateProducerInput): Promise<Producer> {
    return this.producerService.update(producer);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.employee)
  @Delete()
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.producerService.delete(id);
  }
}
