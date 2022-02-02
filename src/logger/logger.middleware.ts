/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-extraneous-import */
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as urlParser from 'url';

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
    let bodyStr = '';

    const isFile =
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data');

    if (!isFile) {
      req.on('data', (chunk) => {
        bodyStr += chunk;
      });
    }

    res.on('close', () => {
      const { hostname, url } = req;
      const { statusCode } = res;

      /* eslint-disable node/no-deprecated-api */
      const urlParts = urlParser.parse(url, true);
      const { query } = urlParts;

      const reqInfo = `Received request from URL: ${hostname}${url}, query params: ${JSON.stringify(
        query,
      )}, body: ${
        bodyStr
          ? JSON.stringify(JSON.parse(bodyStr))
          : 'Detected content-type: multipart/form-data'
      }. Request completed with status code: ${statusCode}`;

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
