import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketDetail } from '../domain/entities/ticketDetail.entity';
import { ITicketDetailRepository } from '../domain/repositories/ticketDetail.repository.interface';

@Injectable()
export class TicketDetailRepository implements ITicketDetailRepository {
  constructor(
    @InjectRepository(TicketDetail)
    private readonly repository: Repository<TicketDetail>,
  ) {}

  async findById(id: number): Promise<TicketDetail | null> {
    return this.repository.findOne({ where: { id: id.toString() } });
  }

  async save(ticketDetail: TicketDetail): Promise<TicketDetail> {
    return await this.repository.save(ticketDetail);
  }

  async updateStock(id: number, stockAvailable: number): Promise<void> {
    await this.repository.update(id.toString(), { stockAvailable });
  }

  // Additional methods for the application service
  async create(ticketDetail: Partial<TicketDetail>): Promise<TicketDetail> {
    const entity = this.repository.create(ticketDetail);
    return await this.repository.save(entity);
  }

  async update(id: string, ticketDetail: Partial<TicketDetail>): Promise<TicketDetail | null> {
    await this.repository.update(id, ticketDetail);
    return await this.findById(parseInt(id));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findAll(): Promise<TicketDetail[]> {
    return await this.repository.find();
  }
}
