import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

export interface IDistributedLocker {
  tryLock(
    lockKey: string,
    waitTime: number,
    leaseTime: number,
  ): Promise<boolean>;
  lock(lockKey: string, leaseTime: number): Promise<void>;
  unlock(lockKey: string): Promise<void>;
  isLocked(lockKey: string): Promise<boolean>;
}

@Injectable()
export class RedisDistributedLocker implements IDistributedLocker {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async tryLock(
    lockKey: string,
    waitTime: number,
    leaseTime: number,
  ): Promise<boolean> {
    const lockValue = uuidv4();
    const lockName = `lock:${lockKey}`;

    try {
      await this.cacheManager.set(lockName, lockValue, leaseTime);
      return true;
    } catch (error) {
      return false;
    }
  }

  async lock(lockKey: string, leaseTime: number): Promise<void> {
    const lockName = `lock:${lockKey}`;
    await this.cacheManager.set(lockName, uuidv4(), leaseTime);
  }

  async unlock(lockKey: string): Promise<void> {
    const lockName = `lock:${lockKey}`;
    await this.cacheManager.del(lockName);
  }

  async isLocked(lockKey: string): Promise<boolean> {
    const lockName = `lock:${lockKey}`;
    const lockValue = await this.cacheManager.get(lockName);
    return lockValue !== null && lockValue !== undefined;
  }
}
