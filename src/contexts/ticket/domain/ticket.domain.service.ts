import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../infrastructure/ticket.repository';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketDomainService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getTicket(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findById(id);
  }
}
