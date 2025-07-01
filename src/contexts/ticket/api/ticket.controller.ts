import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketApplicationService } from '../application/ticket.application.service';
import { Ticket } from '../domain/entities/ticket.entity';
import { CreateTicketDto, UpdateTicketDto } from '../application/dtos/ticket.dto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketAppService: TicketApplicationService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully', type: Ticket })
  async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketAppService.createTicket(createTicketDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: 200, description: 'Ticket found', type: Ticket })
  async getTicket(@Param('id') id: string): Promise<Ticket | null> {
    return await this.ticketAppService.getTicket(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update ticket' })
  @ApiResponse({ status: 200, description: 'Ticket updated successfully', type: Ticket })
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket | null> {
    return await this.ticketAppService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete ticket' })
  @ApiResponse({ status: 204, description: 'Ticket deleted successfully' })
  async deleteTicket(@Param('id') id: string): Promise<void> {
    await this.ticketAppService.deleteTicket(id);
  }
}
// auto-commit 26
// auto-commit 85
