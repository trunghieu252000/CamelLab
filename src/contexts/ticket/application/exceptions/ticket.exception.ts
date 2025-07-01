import { HttpException, HttpStatus } from '@nestjs/common';

export class TicketNotFoundException extends HttpException {
  constructor(ticketId: number) {
    super(`Ticket with ID ${ticketId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InsufficientStockException extends HttpException {
  constructor(ticketId: number) {
    super(`Insufficient stock for ticket ${ticketId}`, HttpStatus.BAD_REQUEST);
  }
}

export class TicketOrderException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
} // auto-commit 27
// auto-commit 86
