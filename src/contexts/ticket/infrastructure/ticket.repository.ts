import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../domain/entities/ticket.entity';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketRepository.create(ticketData);
    return await this.ticketRepository.save(ticket);
  }

  async findById(id: number): Promise<Ticket | null> {
    return await this.ticketRepository.findOne({ where: { id } });
  }

  async update(id: string, ticketData: Partial<Ticket>): Promise<Ticket | null> {
    await this.ticketRepository.update(id, ticketData);
    return await this.findById(parseInt(id));
  }

  async delete(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }
} // auto-commit 31
// auto-commit 90
