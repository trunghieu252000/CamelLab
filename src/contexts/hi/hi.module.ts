import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HiRepository } from './infrastructure/hi.repository';
import { HiDomainService } from './domain/hi.domain.service';
import { HiApplicationService } from './application/hi.application.service';
import { HiController } from './api/hi.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [HiRepository, HiDomainService, HiApplicationService],
  controllers: [HiController],
  exports: [],
})
export class HiModule {}
