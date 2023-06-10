import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QueryValidationService } from '@app/calculator/src/services/query.validation.service';
import { QueryException } from '@app/calculator/src/exception/query.exception';
import { DecryptService } from "@app/calculator/src/services/decrypt.service";

@Injectable()
export class QueryValidatorMiddleware implements NestMiddleware {
  constructor(
    private readonly queryValidationService: QueryValidationService,
    private readonly decryptService: DecryptService,
  ) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const query = req.query.query as string;
    if (!this.queryValidationService.isBase64EncodedString(query)) {
      throw QueryException.throwIsNotBase64IncodedString();
    }
    try {
      this.decryptService.decrypt(query);
    } catch (err) {
      throw QueryException.throwInvalidString();
    }

    next();
  }
}
