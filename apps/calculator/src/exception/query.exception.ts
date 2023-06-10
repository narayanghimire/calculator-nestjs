export class QueryException extends Error {
  public static throwIsNotBase64IncodedString(): never {
    throw new QueryException(
      'Invalid string is given, Please provide base64 encoded string',
    );
  }
  public static throwInvalidString(): never {
    throw new QueryException('cannot decode given base64 encoded string');
  }
}
