import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authCode = 112233;
    if (req.headers && Number(req.headers.authorization) === authCode) next();
    else
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized.',
          data: [],
          pagination: {},
          error: false
        },
        HttpStatus.FORBIDDEN
      );
  }
}
