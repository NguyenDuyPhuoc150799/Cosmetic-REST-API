import { FindAllOrder } from './dto/find-all-order.input';
import { IPayload } from './../../interface/payload';
import { CreateOrderInput } from './dto/create-order.input';
import { Role } from './../../interface/role';
import { JwtAuthGuard } from './../../guard/jwt-auth.guard';
import { Order } from './model/order.model';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorator/role.decorator';
import { UserPayload } from '../../decorator/user-payload.decorator';
import { OrderStatus } from 'src/interface/order-status.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.customer, Role.employee)
  @Get('find-one')
  async findOne(
    @UserPayload() user: IPayload,
    @Query('id') id: string,
  ): Promise<Order[]> {
    return this.orderService.findOne(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.customer, Role.employee)
  @Get()
  async findAll(
    @UserPayload() user: IPayload,
    @Query() findOptions: FindAllOrder,
  ): Promise<Order[]> {
    return this.orderService.findAll(user, findOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.customer)
  @Post()
  async create(
    @UserPayload() user: IPayload,
    @Body() createOrder: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(user, createOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin, Role.customer, Role.employee)
  @Put('change-status')
  async changeStatus(
    @UserPayload() user: IPayload,
    @Query('id') id: string,
    @Query('status') status: OrderStatus,
  ): Promise<Order> {
    return this.orderService.changeStatus(user, id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  async delete(@Query() id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }
}
