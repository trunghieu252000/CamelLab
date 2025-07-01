import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsNumber()
  @IsOptional()
  status?: number;
}

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsNumber()
  @IsOptional()
  status?: number;
} 
