import { Logger } from './logger';
import { Logger as WinstonLogger } from 'winston';

describe('Logger', () => {
  let logger: Logger;
  let winstonLogger: WinstonLogger;

  beforeEach(() => {
    winstonLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    } as unknown as WinstonLogger;
    jest
      .spyOn(Logger.prototype, 'createWinstonLogger')
      .mockReturnValue(winstonLogger);

    logger = new Logger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log an error with meta', () => {
    const meta = { key: 'value' };
    logger.error('Error message', meta);
    expect(winstonLogger.error).toHaveBeenCalledWith('Error message', meta);
  });

  it('should log a warning', () => {
    logger.warn('Warning message');
    expect(winstonLogger.warn).toHaveBeenCalled();
  });
});
