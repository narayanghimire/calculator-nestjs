import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionHandler } from '@app/calculator/src/exception/exception.handler';
import { CalculationExceptionResponse } from '@app/calculator/src/http/responses/calculation.exception.response';
import { ClientIdentifierException } from '@app/common/client.identifier.exception';
import { ClientIdentifierExceptionResponse } from '@app/calculator/src/http/responses/client.identifier.exception.response';
import { NotFoundExceptionResponse } from '@app/calculator/src/http/responses/not.found.exception.response';
import { BadRequestExceptionResponse } from '@app/calculator/src/http/responses/bad.request.exception.response';
import { DefaultExceptionResponse } from '@app/calculator/src/http/responses/defualt.exception.response';
import { CalculationException } from '@app/calculator/src/exception/calculation.exception';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Logger } from '@app/calculator/src/logger/logger';

describe('ExceptionHandler', () => {
  let exceptionHandler: ExceptionHandler;
  let loggerMock: Logger;

  beforeEach(async () => {
    loggerMock = {
      error: jest.fn(), // Mock the `error` method of the logger
    } as unknown as Logger;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExceptionHandler,
        {
          provide: Logger,
          useValue: loggerMock,
        },
      ],
    }).compile();

    exceptionHandler = module.get<ExceptionHandler>(ExceptionHandler);
  });

  it('should handle CalculationException', () => {
    const calculationException = new CalculationException('Calculation error');
    const response = exceptionHandler.handleException(calculationException);
    expect(response).toBeInstanceOf(CalculationExceptionResponse);
    expect(response.message).toBe(calculationException.message);
    expect(loggerMock.error).toHaveBeenCalledWith(
      calculationException.message,
      { stack: calculationException.stack }
    );
  });

  it('should handle ClientIdentifierException', () => {
    const clientIdentifierException = new ClientIdentifierException(
      'Client identifier error'
    );
    const response = exceptionHandler.handleException(
      clientIdentifierException
    );
    expect(response).toBeInstanceOf(ClientIdentifierExceptionResponse);
    expect(response.message).toBe(clientIdentifierException.message);
    expect(loggerMock.error).toHaveBeenCalledWith(
      clientIdentifierException.message,
      { stack: clientIdentifierException.stack }
    );
  });

  it('should handle NotFoundException', () => {
    const notFoundException = new NotFoundException('Resource not found');
    const response = exceptionHandler.handleException(notFoundException);
    expect(response).toBeInstanceOf(NotFoundExceptionResponse);
    expect(loggerMock.error).toHaveBeenCalledWith(notFoundException.message, {
      stack: notFoundException.stack,
    });
  });

  it('should handle BadRequestException', () => {
    const badRequestException = new BadRequestException('Bad request');
    const response = exceptionHandler.handleException(badRequestException);
    expect(response).toBeInstanceOf(BadRequestExceptionResponse);
    expect(loggerMock.error).toHaveBeenCalledWith(badRequestException.message, {
      stack: badRequestException.stack,
    });
  });

  it('should handle other exceptions with DefaultExceptionResponse', () => {
    const error = new Error('Test error');
    const response = exceptionHandler.handleException(error);
    expect(response).toBeInstanceOf(DefaultExceptionResponse);
    expect(loggerMock.error).toHaveBeenCalledWith(error.message, {
      stack: error.stack,
    });
  });
});
