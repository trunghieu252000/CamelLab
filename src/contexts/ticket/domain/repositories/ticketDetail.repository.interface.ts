import { TicketDetail } from '../entities/ticketDetail.entity';

export const TICKET_DETAIL_REPOSITORY = 'TICKET_DETAIL_REPOSITORY';

export interface ITicketDetailRepository {
  findById(id: number): Promise<TicketDetail | null>;
  save(ticketDetail: TicketDetail): Promise<TicketDetail>;
  updateStock(id: number, stockAvailable: number): Promise<void>;
  create(ticketDetail: Partial<TicketDetail>): Promise<TicketDetail>;
  update(id: string, ticketDetail: Partial<TicketDetail>): Promise<TicketDetail | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<TicketDetail[]>;
} // auto-commit 34
// auto-commit 93
