import { Injectable, LoggerService, Scope } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  private logger: WinstonLogger;

  constructor() {
    this.logger = this.createWinstonLogger();
  }

  log(message: any, ...optionalParams: any[]): void {
    this.logger.log(message, optionalParams);
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.logger.warn(message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]): void {
    this.logger.error(message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    this.logger.error(message, optionalParams);
  }

  createWinstonLogger(): WinstonLogger {
    const fileTransport = new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    });

    return createLogger({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      transports: [fileTransport],
    });
  }
}
