import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/entities/order.entity';
import { OrderApplicationService } from './application/order.application.service';
import { OrderRepository } from './infrastructure/order.repository';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository.interface';
import { OrderController } from './api/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderApplicationService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
    OrderRepository,
  ],
  exports: [OrderApplicationService],
})
export class OrderModule {} 

