import { Module } from '@nestjs/common';
import { CircuitBreaker } from './infrastructure/circuit-breaker/circuit-breaker.service';
import { RateLimiter } from './infrastructure/distributed/rate-limiter';

@Module({
  providers: [CircuitBreaker, RateLimiter],
  exports: [CircuitBreaker, RateLimiter],
})
export class SharedModule {}
