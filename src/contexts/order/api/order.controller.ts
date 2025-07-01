import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderApplicationService } from '../application/order.application.service';
import { CreateOrderDto, UpdateOrderDto } from '../application/dtos/order.dto';
import { Order } from '../domain/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderApplicationService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto): Promise<Order | null> {
    return this.orderService.updateOrder(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.orderService.deleteOrder(id);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
} // auto-commit 2
// auto-commit 61
// auto-commit 120
