import { Order } from '../entities/order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  create(order: Partial<Order>): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Order[]>;
} // auto-commit 6
// auto-commit 65
// auto-commit 124
