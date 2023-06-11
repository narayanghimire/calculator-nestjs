import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExceptionHandler } from '@app/calculator/src/exception/exception.handler';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private exceptionHandler: ExceptionHandler) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const exceptionResponse = this.exceptionHandler.handleException(exception);
    response.status(exceptionResponse.statusCode).json({
      error: exceptionResponse.error,
      message: exceptionResponse.message,
    });
  }
}
