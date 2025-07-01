import { Injectable } from '@nestjs/common';

@Injectable()
export class CircuitBreaker {
  async execute<T>(id: string, command: () => Promise<T>): Promise<T> {
    try {
      return await command();
    } catch (error) {
      throw error;
    }
  }
}
