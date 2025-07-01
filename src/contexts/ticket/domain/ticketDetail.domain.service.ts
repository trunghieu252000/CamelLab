import { Injectable, Inject } from '@nestjs/common';
import { TicketDetail } from './entities/ticketDetail.entity';
import {
  ITicketDetailRepository,
  TICKET_DETAIL_REPOSITORY,
} from './repositories/ticketDetail.repository.interface';

@Injectable()
export class TicketDetailDomainService {
  constructor(
    @Inject(TICKET_DETAIL_REPOSITORY)
    private readonly ticketDetailRepository: ITicketDetailRepository,
  ) {}

  async getTicketDetailById(ticketId: number): Promise<TicketDetail | null> {
    return this.ticketDetailRepository.findById(ticketId);
  }

  async orderTicketByUser(ticketId: number): Promise<boolean> {
    const ticketDetail = await this.ticketDetailRepository.findById(ticketId);

    if (!ticketDetail) {
      throw new Error('Ticket not found');
    }

    if (ticketDetail.stockAvailable <= 0) {
      throw new Error('No stock available');
    }

    await this.ticketDetailRepository.updateStock(
      ticketId,
      ticketDetail.stockAvailable - 1,
    );

    return true;
  }

  async getTicketDetail(id: string): Promise<any> {
    return { id, status: 'active', createdAt: new Date() };
  }

  async createTicketDetail(data: any): Promise<any> {
    return { ...data, id: 'generated-id', createdAt: new Date() };
  }

  async updateTicketDetail(id: string, data: any): Promise<any> {
    return { ...data, id, updatedAt: new Date() };
  }

  async deleteTicketDetail(id: string): Promise<boolean> {
    return true;
  }
}
