import { Inject, Injectable } from '@nestjs/common';
import { CALCULATION_REPOSITORY_PERSIST_TOKEN } from '../constants/constants';
import { ICalculationPersistenceRespository } from '@app/calculator/src/repository/calculation.persistence.respository.interface';
import { CalculationResult } from '@app/calculator/src/entities/calculation.result';
import { CalculationException } from '@app/calculator/src/exception/calculation.exception';
import { CalculationHistoryDto } from '@app/calculator/src/entities/calculation.history.dto';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject(CALCULATION_REPOSITORY_PERSIST_TOKEN)
    private readonly persist: ICalculationPersistenceRespository
  ) {}
  public async calculate(query: string): Promise<CalculationResult> {
    try {
      const result = await eval(query);
      return new CalculationResult(result);
    } catch (error) {
      CalculationException.throwCalculationException();
    }
  }

  public async persistCalculation(
    query: string,
    result: number
  ): Promise<void> {
    try {
      await this.persist.saveCalculation(query, result);
    } catch (error) {
      CalculationException.throwCannotSaveCalculatedValueException();
    }
  }

  public async getQueryCalculationHistory(): Promise<CalculationHistoryDto[]> {
    try {
      return await this.persist.getLastFiveCalculationsHistory();
    } catch (error) {
      CalculationException.throwCalculationHistoryException();
    }
  }
}
