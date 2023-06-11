import { QueryException } from './query.exception';

describe('QueryException', () => {
  it('should throw an exception for invalid base64 encoded string', () => {
    expect(() => {
      QueryException.throwIsNotBase64IncodedString();
    }).toThrow(QueryException);
    expect(() => {
      QueryException.throwIsNotBase64IncodedString();
    }).toThrowError(
      'Invalid string is given, Please provide base64 encoded string'
    );
  });

  it('should throw an exception for invalid decoded string', () => {
    expect(() => {
      QueryException.throwInvalidString();
    }).toThrow(QueryException);
    expect(() => {
      QueryException.throwInvalidString();
    }).toThrowError('cannot decode given base64 encoded string');
  });
});
