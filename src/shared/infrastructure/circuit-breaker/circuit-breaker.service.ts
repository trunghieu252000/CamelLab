import { Injectable } from '@nestjs/common';

@Injectable()
export class CircuitBreaker {
  private failures = new Map<string, number>();
  private lastFailureTime = new Map<string, number>();
  private readonly threshold = 5;
  private readonly timeout = 60000; // 1 minute

  async execute<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    if (this.isOpen(operation)) {
      throw new Error(`Circuit breaker is open for operation: ${operation}`);
    }

    try {
      const result = await fn();
      this.onSuccess(operation);
      return result;
    } catch (error) {
      this.onFailure(operation);
      throw error;
    }
  }

  private isOpen(operation: string): boolean {
    const failures = this.failures.get(operation) || 0;
    const lastFailure = this.lastFailureTime.get(operation) || 0;
    
    if (failures >= this.threshold) {
      const now = Date.now();
      if (now - lastFailure < this.timeout) {
        return true;
      } else {
        // Reset after timeout
        this.failures.set(operation, 0);
        this.lastFailureTime.delete(operation);
      }
    }
    
    return false;
  }

  private onSuccess(operation: string): void {
    this.failures.set(operation, 0);
    this.lastFailureTime.delete(operation);
  }

  private onFailure(operation: string): void {
    const currentFailures = this.failures.get(operation) || 0;
    this.failures.set(operation, currentFailures + 1);
  }
} 
