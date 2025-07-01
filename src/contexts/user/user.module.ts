import { Module } from '@nestjs/common';
import { UserApplicationService } from './application/user.application.service';
import { UserController } from './api/user.controller';
import { UserRepository } from './infrastructure/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserApplicationService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    UserRepository,
  ],
  exports: [UserApplicationService],
})
export class UserModule {} 
