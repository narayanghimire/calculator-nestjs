export interface ICalculationRepository {
   calculate(expression: string): Promise<number>;
}
