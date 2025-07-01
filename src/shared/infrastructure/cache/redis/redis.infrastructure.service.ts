import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisInfrastructureService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async setString(key: string, value: string): Promise<void> {
    if (!key) return;
    await this.cacheManager.set(key, value);
  }

  async getString(key: string): Promise<string | null> {
    const result = await this.cacheManager.get(key);
    return result ? String(result) : null;
  }

  async setObject(key: string, value: any): Promise<void> {
    if (!key) return;
    try {
      await this.cacheManager.set(key, value);
    } catch (error) {
      console.error('setObject error:', error.message);
    }
  }

  async getObject<T>(key: string, targetClass: new () => T): Promise<T | null> {
    try {
      const result = await this.cacheManager.get(key);
      if (!result) return null;
      
      // Simple object reconstruction
      const obj = new targetClass();
      Object.assign(obj, result);
      return obj;
    } catch (error) {
      console.error('getObject error:', error.message);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  // Additional methods needed by the cache service
  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!key) return;
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      console.error('set error:', error.message);
    }
  }

  async get(key: string): Promise<any> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      console.error('get error:', error.message);
      return null;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      console.error('del error:', error.message);
    }
  }
}

