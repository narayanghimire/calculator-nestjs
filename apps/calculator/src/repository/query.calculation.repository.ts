import { Injectable } from '@nestjs/common';
import { ICalculationRepository } from '@app/calculator/src/repository/calculation.repository.interface';

@Injectable()
export class QueryCalculationRepository implements ICalculationRepository {
  public async calculate(expression: string): Promise<number> {
    return eval(expression);
  }
}
