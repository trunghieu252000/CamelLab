import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../infrastructure/ticket.repository';
import { Ticket } from '../domain/entities/ticket.entity';
import { CreateTicketDto, UpdateTicketDto } from './dtos/ticket.dto';

@Injectable()
export class TicketApplicationService {
  constructor(
    private readonly ticketRepository: TicketRepository,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketRepository.create(createTicketDto);
  }

  async getTicket(id: string): Promise<Ticket | null> {
    return await this.ticketRepository.findById(parseInt(id));
  }

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket | null> {
    return await this.ticketRepository.update(id, updateTicketDto);
  }

  async deleteTicket(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async orderTicketByUser(ticketId: string): Promise<any> {
    return await this.getTicket(ticketId);
  }
}
// auto-commit 30
// auto-commit 89
