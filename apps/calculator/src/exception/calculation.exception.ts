export class CalculationException extends Error {
  public static throwCalculationException(): never {
    throw new CalculationException(
      'cannot perform calculation on given string',
    );
  }

  public static throwCannotSaveCalculatedValueException() {
    throw new CalculationException(
      'unable to save calculated value in database',
    );
  }

  public static throwCalculationHistoryException(): never {
    throw new CalculationException(
      'unable to get calculation history from database',
    );
  }
}
