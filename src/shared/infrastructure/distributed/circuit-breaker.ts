import { Injectable } from '@nestjs/common';

@Injectable()
export class CircuitBreaker {
  private states = new Map<
    string,
    {
      state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
      failureCount: number;
      lastFailureTime: number;
      successCount: number;
    }
  >();

  private readonly failureThreshold = 5;
  private readonly timeoutMs = 60000;
  private readonly successThreshold = 2;

  async canExecute(key: string): Promise<boolean> {
    const circuit = this.states.get(key) || {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: 0,
      successCount: 0,
    };

    if (circuit.state === 'OPEN') {
      if (Date.now() - circuit.lastFailureTime > this.timeoutMs) {
        circuit.state = 'HALF_OPEN';
        circuit.successCount = 0;
      } else {
        return false;
      }
    }

    return true;
  }

  async recordSuccess(key: string): Promise<void> {
    const circuit = this.states.get(key) || {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: 0,
      successCount: 0,
    };

    if (circuit.state === 'HALF_OPEN') {
      circuit.successCount++;
      if (circuit.successCount >= this.successThreshold) {
        circuit.state = 'CLOSED';
        circuit.failureCount = 0;
      }
    } else {
      circuit.failureCount = 0;
    }

    this.states.set(key, circuit);
  }

  async recordFailure(key: string): Promise<void> {
    const circuit = this.states.get(key) || {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: 0,
      successCount: 0,
    };

    circuit.failureCount++;
    circuit.lastFailureTime = Date.now();

    if (circuit.failureCount >= this.failureThreshold) {
      circuit.state = 'OPEN';
    }

    this.states.set(key, circuit);
  }
}
