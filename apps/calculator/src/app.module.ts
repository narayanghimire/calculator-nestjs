import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ClientIdentifierModule } from '@app/common/client.identifier.module';
import { CalculationSchema, CalculationSchemaClass } from "@app/calculator/src/entities/calculation.schema";
import { CalculatorController } from "@app/calculator/src/http/controllers/calculator.controller";
import { CALCULATION_REPOSITORY_PERSIST_TOKEN } from "@app/calculator/src/constants/constants";
import { CalculationPersistenceRepository } from "@app/calculator/src/repository/calculation.persistence.repository";
import { CalculatorService } from "@app/calculator/src/services/calculator.service";
import { DecryptService } from "@app/calculator/src/services/decrypt.service";
import { ExceptionHandler } from "@app/calculator/src/exception";
import { QueryValidationService } from "@app/calculator/src/services/query.validation.service";
import { QueryValidatorMiddleware } from "@app/calculator/src/http/middleware/query.validator.middleware";

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongodb:27017/calculator`),
    MongooseModule.forFeature([
      { name: CalculationSchemaClass.name, schema: CalculationSchema },
    ]),
    ClientIdentifierModule
  ],
  controllers: [CalculatorController],
  providers: [
    {
      provide: CALCULATION_REPOSITORY_PERSIST_TOKEN,
      useClass: CalculationPersistenceRepository,
    },
    CalculatorService,
    DecryptService,
    ExceptionHandler,
    QueryValidationService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryValidatorMiddleware)
      .forRoutes({ path: 'calculus', method: RequestMethod.GET });
  }
}
