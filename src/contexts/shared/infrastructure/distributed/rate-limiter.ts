import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiter {
  // This is a mock implementation.
  isAllowed(key: string): boolean {
    return true;
  }
} 
