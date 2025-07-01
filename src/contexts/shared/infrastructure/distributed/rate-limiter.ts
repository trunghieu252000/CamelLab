import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiter {
  // This is a mock implementation.
  isAllowed(key: string): boolean {
    return true;
  }
} // auto-commit 16
// auto-commit 75
