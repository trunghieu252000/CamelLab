import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HiApplicationService } from '../application/hi.application.service';
import { CircuitBreaker } from '../../shared/infrastructure/circuit-breaker/circuit-breaker.service';

@ApiTags('hi')
@Controller('hi')
export class HiController {
  constructor(
    private readonly hiApplicationService: HiApplicationService,
    private readonly circuitBreaker: CircuitBreaker,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Hello message retrieved' })
  async getHello(): Promise<string> {
    return await this.hiApplicationService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Create hello message' })
  @ApiResponse({ status: 201, description: 'Hello message created' })
  async createHello(@Body() data: { message: string }): Promise<string> {
    return await this.hiApplicationService.createHello(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hello by ID' })
  @ApiResponse({ status: 200, description: 'Hello message found' })
  async getHelloById(@Param('id') id: string): Promise<string> {
    return await this.hiApplicationService.getHelloById(id);
  }

  @Get('query/test')
  @ApiOperation({ summary: 'Test query parameters' })
  @ApiResponse({ status: 200, description: 'Query test successful' })
  async testQuery(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<string> {
    return await this.hiApplicationService.testQuery(name, age);
  }
}
