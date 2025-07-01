import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 60000, // 1 minute default
        max: 100, // maximum number of items in cache
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisConfig {}
