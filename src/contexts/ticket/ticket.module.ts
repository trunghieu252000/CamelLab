import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './domain/entities/ticket.entity';
import { TicketDetail } from './domain/entities/ticketDetail.entity';
import { TicketApplicationService } from './application/ticket.application.service';
import { TicketController } from './api/ticket.controller';
import { TicketRepository } from './infrastructure/ticket.repository';
import { TicketDetailRepository } from './infrastructure/ticketDetail.repository';
import { TicketDomainService } from './domain/ticket.domain.service';
import { TicketDetailDomainService } from './domain/ticketDetail.domain.service';
import { TICKET_DETAIL_REPOSITORY } from './domain/repositories/ticketDetail.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketDetail]),
  ],
  controllers: [TicketController],
  providers: [
    TicketApplicationService,
    TicketRepository,
    TicketDomainService,
    TicketDetailDomainService,
    {
      provide: TICKET_DETAIL_REPOSITORY,
      useClass: TicketDetailRepository,
    },
  ],
  exports: [TicketApplicationService],
})
export class TicketModule {}
// auto-commit 25
// auto-commit 84
