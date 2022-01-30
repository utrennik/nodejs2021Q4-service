/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-extraneous-import */
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    process.on('uncaughtException', (e) => {
      const errorMessage = `ERROR: ${e.message || 'something has happened..'}`;
      logger.error(errorMessage);
      console.error(errorMessage);
      process.exit(1);
    });

    process.on('unhandledRejection', (e) => {
      const errorMessage = `ERROR: ${
        (e as Error).message || 'something has happened..'
      }`;
      logger.error(errorMessage);
      console.error(errorMessage);
      process.exit(1);
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      const { hostname, url, query, body } = req;
      const { statusCode } = res;

      const reqInfo = `Received request from URL: ${hostname}${url}, query params: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(
        body as string,
      )}. Request completed with status code: ${statusCode}`;

      const firstDigit = `${statusCode}`[0];

      if (firstDigit === '4' || firstDigit === '5') {
        this.logger.error(reqInfo);
      } else {
        this.logger.log(reqInfo);
      }
    });

    next();
  }
}
