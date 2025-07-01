import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as cls from 'cls-hooked';

@Injectable()
export class StructuredLoggingService {
  private readonly logger = new Logger(StructuredLoggingService.name);
  private readonly namespace = cls.createNamespace('nestjs-hd');

  setTraceId(traceId?: string): string {
    const id = traceId || uuidv4();
    this.namespace.run(() => {
      this.namespace.set('traceId', id);
    });
    return id;
  }

  getTraceId(): string | undefined {
    return this.namespace.get('traceId');
  }

  log(message: string, context?: string, data?: any): void {
    const traceId = this.getTraceId();
    const logData = {
      traceId,
      message,
      context,
      data,
      timestamp: new Date().toISOString(),
    };
    
    this.logger.log(JSON.stringify(logData));
  }

  error(message: string, error?: Error, context?: string): void {
    const traceId = this.getTraceId();
    const logData = {
      traceId,
      message,
      error: error?.message,
      stack: error?.stack,
      context,
      timestamp: new Date().toISOString(),
    };
    
    this.logger.error(JSON.stringify(logData));
  }
} 
