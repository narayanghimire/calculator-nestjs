import { NestFactory } from '@nestjs/core';
import { ExceptionHandler } from '@app/calculator/src/exception/exception.handler';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@app/calculator/src/app.module';
import { GlobalExceptionFilter } from '@app/calculator/src/exception/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const exceptionHandler = app.get('ExceptionHandler');
  app.useGlobalFilters(new GlobalExceptionFilter(exceptionHandler));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
