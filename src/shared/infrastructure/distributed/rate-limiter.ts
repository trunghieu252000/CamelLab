import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiter {
  private limits = new Map<string, { count: number; resetTime: number }>();

  async checkLimit(key: string, limit: number = 10, windowMs: number = 60000): Promise<boolean> {
    const now = Date.now();
    const limitInfo = this.limits.get(key);

    if (!limitInfo || now > limitInfo.resetTime) {
      this.limits.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (limitInfo.count >= limit) {
      return false;
    }

    limitInfo.count++;
    return true;
  }
}
