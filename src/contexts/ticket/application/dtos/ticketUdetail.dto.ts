import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TicketDetailDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  stockInitial: number;

  @ApiProperty()
  @IsNumber()
  stockAvailable: number;

  @ApiProperty()
  @IsBoolean()
  isStockPrepared: boolean;

  @ApiProperty()
  @IsNumber()
  priceOriginal: number;

  @ApiProperty()
  @IsNumber()
  priceFlash: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  saleStartTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  saleEndTime?: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  activityId?: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  version?: number;
}
