import { Injectable } from '@nestjs/common';
import {
  RedisDistributedLocker,
  IDistributedLocker,
} from './redis-distributed-locker';

@Injectable()
export class RedisDistributedService {
  constructor(private readonly distributedLocker: RedisDistributedLocker) {}

  getLocker(): IDistributedLocker {
    return this.distributedLocker;
  }
}
