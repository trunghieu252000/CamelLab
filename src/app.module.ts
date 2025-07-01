import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TicketModule } from './contexts/ticket/ticket.module';
import { HiModule } from './contexts/hi/hi.module';
import { ProductModule } from './contexts/product/product.module';
import { UserModule } from './contexts/user/user.module';
import { OrderModule } from './contexts/order/order.module';
import { RedisConfig } from './shared/infrastructure/config/redis.config';
import { ScheduledTasksService } from './shared/application/scheduledTasks.service';
import { StructuredLoggingService } from './shared/infrastructure/structuredLogging.service';
import { HealthController } from './shared/api/health.controller';
import { SharedModule } from './contexts/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'camel_lab',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register(),
    HttpModule,
    ScheduleModule.forRoot(),
    TicketModule,
    HiModule,
    ProductModule,
    UserModule,
    OrderModule,
    SharedModule,
  ],
  controllers: [HealthController],
  providers: [RedisConfig, ScheduledTasksService, StructuredLoggingService],
})
export class AppModule {}
