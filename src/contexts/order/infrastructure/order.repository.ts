import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../domain/entities/order.entity';
import { IOrderRepository } from '../domain/repositories/order.repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return await this.orderRepository.save(order);
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, orderData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
} 