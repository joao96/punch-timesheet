import { AppError } from '@application/usecases/errors/app-error';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      return res.status(500).json({
        status: 'Error',
        message: `Internal server error.`,
      });
    }
  }
}
