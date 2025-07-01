import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductApplicationService } from '../application/product.application.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../application/dtos/product.dto';
import { Product } from '../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductApplicationService) {}

  @Post()
  @ApiResponse({ status: 201, type: Product })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Product })
  async findById(@Param('id') id: string): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Product })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  async findAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
