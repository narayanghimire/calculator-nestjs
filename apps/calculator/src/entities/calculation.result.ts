import { IsBoolean, IsNumber } from 'class-validator';

export class CalculationResult {
  @IsBoolean()
  public readonly error: boolean;

  @IsNumber()
  public readonly result: number;

  constructor(result: number, error = false) {
    this.error = error;
    this.result = result;
  }
}
