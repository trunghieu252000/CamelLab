import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/repositories/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    await this.productRepository.update(id, productData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
