import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../infrastructure/order.repository';
import { CreateOrderDto, UpdateOrderDto } from './dtos/order.dto';
import { Order } from '../domain/entities/order.entity';

@Injectable()
export class OrderApplicationService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create(dto);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<Order | null> {
    return this.orderRepository.update(id, dto);
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
} // auto-commit 3
// auto-commit 62
// auto-commit 121
