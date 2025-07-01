import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { ProductApplicationService } from './application/product.application.service';
import { ProductRepository } from './infrastructure/product.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product.repository.interface';
import { ProductController } from './api/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductApplicationService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    ProductRepository,
  ],
  exports: [ProductApplicationService],
})
export class ProductModule {}
