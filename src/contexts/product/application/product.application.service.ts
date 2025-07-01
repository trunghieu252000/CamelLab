import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/product.repository';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { Product } from '../domain/entities/product.entity';

@Injectable()
export class ProductApplicationService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(dto);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productRepository.update(id, dto);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
